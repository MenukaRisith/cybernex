// app/routes/login.tsx
import type { ActionFunction } from "@remix-run/node";
import {
  json,
  redirect,
  createCookieSessionStorage,
} from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { connectDB } from "~/lib/db.server";

const sessionSecret = process.env.SESSION_SECRET || "default-secret";
const storage = createCookieSessionStorage({
  cookie: {
    name: "__admin_session",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username")?.toString();
  const password = form.get("password")?.toString();

  if (!username || !password) {
    return json({ error: "Username and password are required." }, { status: 400 });
  }

  const db = await connectDB();
  const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [username]);
  const admin = (rows as { id: number; username: string; password_hash: string }[])[0];

  if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = await storage.getSession();
  session.set("loggedIn", true);
  session.set("adminUsername", admin.username);

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <Form method="post" className="grid gap-4">
        <input name="username" placeholder="Username" className="p-2 rounded bg-gray-100 dark:bg-gray-800" />
        <input type="password" name="password" placeholder="Password" className="p-2 rounded bg-gray-100 dark:bg-gray-800" />
        {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          {navigation.state === "submitting" ? "Logging in..." : "Login"}
        </button>
      </Form>
    </main>
  );
}
