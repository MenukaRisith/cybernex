import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  writeAsyncIterableToWritable,
  type UploadHandler,
} from "@remix-run/node";

import fs from "fs";
import path from "path";
import { createConnection } from "mysql2/promise";
import { createRateLimiter } from "~/utils/rateLimiter.server";

// 🚫 Prevent GET requests
export const loader: LoaderFunction = async () => {
  return new Response("<h1>405 – Method Not Allowed</h1><p>POST only.</p>", {
    status: 405,
    headers: { "Content-Type": "text/html" },
  });
};

// 📁 Upload handler for schoolLogo
const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
  async ({ filename, data }) => {
    if (!filename) return undefined;
    const safeFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, safeFilename);
    await writeAsyncIterableToWritable(data, fs.createWriteStream(filePath));
    return `/uploads/${safeFilename}`;
  },
  unstable_createMemoryUploadHandler()
);

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method Not Allowed" }, { status: 405 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = await createRateLimiter(ip, 5, 3600);
  if (!limit.success) {
    return json({ success: false, message: "Rate limit exceeded. Try again later." }, { status: 429 });
  }

  try {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);
    const category = formData.get("eventCategory")?.toString().toLowerCase().trim();

    if (!category) {
      return json({ success: false, message: "Missing or invalid event category." }, { status: 400 });
    }

    const conn = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    const run = (query: string, params: unknown[]) => conn.execute(query, params);
    const val = (key: string) => formData.get(key)?.toString().trim() || "";

    switch (category) {
      case "web_dev":
      case "game_dev":
      case "poster_design":
      case "manipulation_arts": {
        const values = ["fullName", "email", "school", "whatsappNo", "birthday", "schoolLogo"].map(val);
        if (values.some((v) => !v)) throw new Error("Missing required fields");
        await run(
          `INSERT INTO ${category} (fullName,email,school,whatsappNo,birthday,schoolLogo) VALUES (?,?,?,?,?,?)`,
          values
        );
        break;
      }

      case "algorithm":
      case "algo": {
        const values = [
          val("fullName"),
          val("email"),
          val("school"),
          val("whatsappNo"),
          val("birthday"),
          val("schoolLogo"),
          val("hackerRankID"),
        ];
        if (values.some((v) => !v)) throw new Error("Missing required fields");
        await run(
          `INSERT INTO algorithm (fullName,email,school,whatsappNo,birthday,schoolLogo,hackerRankID) VALUES (?,?,?,?,?,?,?)`,
          values
        );
        break;
      }

      case "ragnar": {
        const teamName = val("teamName");
        const school = val("school");
        const logo = val("schoolLogo");
        if (!teamName || !school || !logo) throw new Error("Missing team details");

        for (let i = 1; i <= 5; i++) {
          const player = [
            val(`player${i}_name`),
            val(`player${i}_codm_id`),
            val(`player${i}_birthday`),
            val(`player${i}_whatsappNo`),
            val(`player${i}_email`),
          ];
          if (player.some((p) => !p)) throw new Error(`Missing player ${i} details`);
          await run(
            `INSERT INTO esport (teamName,school,schoolLogo,playerIndex,name,codm_id,birthday,whatsappNo,email) VALUES (?,?,?,?,?,?,?,?,?)`,
            [teamName, school, logo, i, ...player]
          );
        }
        break;
      }

      case "quiz": {
        const school = val("school");
        const logo = val("schoolLogo");
        if (!school || !logo) throw new Error("Missing quiz team details");

        for (let i = 1; i <= 4; i++) {
          const member = [
            val(`member${i}_name`),
            val(`member${i}_birthday`),
            val(`member${i}_email`),
            val(`member${i}_whatsappNo`),
          ];
          if (member.some((m) => !m)) throw new Error(`Missing member ${i} details`);
          await run(
            `INSERT INTO quiz (school,schoolLogo,memberIndex,name,birthday,email,whatsappNo) VALUES (?,?,?,?,?,?,?)`,
            [school, logo, i, ...member]
          );
        }
        break;
      }

      default:
        return json({ success: false, message: "Unknown or unsupported category." }, { status: 400 });
    }

    await conn.end();
    return json({ success: true, message: "Registration successful." });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Internal Server Error");
    console.error("[REGISTER API ERROR]:", error.message);
    return json({ success: false, message: error.message }, { status: 500 });
  }
};
