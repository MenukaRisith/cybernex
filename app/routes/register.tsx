import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "~/components/NavBar";
import FooterSection from "~/components/Footer";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Register | CyberNex 2025 – ICT Day Event" },
    {
      name: "description",
      content:
        "Register for CyberNex 2025 – the North Central Province’s biggest ICT Day event. Join competitions in coding, design, quizzes, and eSports. Open for Grades 6–13.",
    },
    { property: "og:title", content: "CyberNex 2025 – Register Now" },
    {
      property: "og:description",
      content:
        "Be a part of Sri Lanka's leading school tech event! Register now for coding, design, quiz, and gaming competitions at CyberNex.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "CyberNex 2025 – Register Now" },
    {
      name: "twitter:description",
      content:
        "CyberNex is calling all school tech talents! Secure your spot in the region's most thrilling ICT Day event competitions.",
    },
  ];
};



const categoryLogos: Record<string, string> = {
  codexa: "/images/comp/codexa.svg",
  pixora: "/images/comp/pixora.svg",
  quiz: "/images/comp/quizzara.svg",
  esport: "/images/comp/ragnar.svg",
};

export default function RegisterPage() {
  const [category, setCategory] = useState("codexa");
  const [codexaType, setCodexaType] = useState("web_dev");
  const [pixoraType, setPixoraType] = useState("poster_design");
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const eventCategory =
    category === "codexa"
      ? codexaType
      : category === "pixora"
      ? pixoraType
      : category;

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <>
      <NavBar />

      <div className="relative min-h-screen mt-10 bg-[#0d0d14] font-[DM_SANS]">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/bg/Vector.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d14]/80 z-10" />

        <main className="relative z-20 px-4 py-20 flex items-start justify-center text-white">
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl rounded-xl shadow-lg border border-[#262635] bg-[#14141e] relative z-30"
          >
            <div className="p-6 sm:p-10">
              <div className="flex justify-center mb-4">
                <img src={categoryLogos[category]} alt={category} className="h-12" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4 font-[Montserrat]">
                Register for CyberNex
              </h1>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[
                  { label: "Codexa", value: "codexa" },
                  { label: "Pixora", value: "pixora" },
                  { label: "Quizzara", value: "quiz" },
                  { label: "Ragnar", value: "esport" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`px-4 py-1.5 rounded text-sm border transition ${
                      category === cat.value
                        ? "bg-white text-black border-white"
                        : "border-[#333346] bg-transparent text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <form
                className="space-y-5"
                encType="multipart/form-data"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  formData.set("eventCategory", eventCategory);
                  setSubmitting(true);

                  try {
                    const res = await fetch("/api/register", {
                      method: "POST",
                      body: formData,
                    });
                    const result = await res.json();
                    setMessage({ text: result.message, success: result.success });
                    if (result.success) form.reset();
                  } catch {
                    setMessage({ text: "Something went wrong. Please try again.", success: false });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <input type="hidden" name="eventCategory" value={eventCategory} />

                {category === "codexa" && (
                  <Select
                    name="codexaCategory"
                    label="Codexa Category"
                    value={codexaType}
                    onChange={(e) => setCodexaType(e.target.value)}
                    options={[
                      { value: "web_dev", label: "Web Development" },
                      { value: "algo", label: "Algorithm" },
                      { value: "game_dev", label: "Game Development" },
                    ]}
                  />
                )}

                {category === "pixora" && (
                  <Select
                    name="pixoraCategory"
                    label="Pixora Category"
                    value={pixoraType}
                    onChange={(e) => setPixoraType(e.target.value)}
                    options={[
                      { value: "poster_design", label: "Poster Design" },
                      { value: "manipulation_arts", label: "Manipulation Arts" },
                    ]}
                  />
                )}

                {category !== "esport" && category !== "quiz" && (
                  <>
                    <Input name="fullName" label="Full Name" required />
                    <Input name="email" label="Email" type="email" required />
                    {category === "codexa" && codexaType === "algo" && (
                      <Input name="hackerRankID" label="HackerRank ID" required />
                    )}
                    <Input name="school" label="School" required />
                    <Input name="birthday" label="Birth Date" type="date" required />
                    <Input name="whatsappNo" label="WhatsApp Number" required />
                  </>
                )}

                {category === "esport" && (
                  <>
                    <Input name="teamName" label="Team Name" required />
                    <Input name="school" label="School" required />
                    {[1, 2, 3, 4, 5].map((i) => (
                      <fieldset key={i} className="border border-[#2f2f40] p-3 rounded-md">
                        <legend className="text-xs text-gray-400 mb-1">Player {i}</legend>
                        <Input name={`player${i}_name`} label="Name" required />
                        <Input name={`player${i}_codm_id`} label="CODM ID" required />
                        <Input name={`player${i}_birthday`} label="Birthday" type="date" required />
                        <Input name={`player${i}_whatsappNo`} label="WhatsApp No" required />
                        <Input name={`player${i}_email`} label="Email" type="email" required />
                      </fieldset>
                    ))}
                  </>
                )}

                {category === "quiz" && (
                  <>
                    <Input name="school" label="School" required />
                    {[1, 2, 3, 4].map((i) => (
                      <fieldset key={i} className="border border-[#2f2f40] p-3 rounded-md">
                        <legend className="text-xs text-gray-400 mb-1">Member {i}</legend>
                        <Input name={`member${i}_name`} label="Name" required />
                        <Input name={`member${i}_birthday`} label="Birthday" type="date" required />
                        <Input name={`member${i}_email`} label="Email" type="email" required />
                        <Input name={`member${i}_whatsappNo`} label="WhatsApp No" required />
                      </fieldset>
                    ))}
                  </>
                )}

                {/* 🔄 Universal school logo field for all categories */}
                <FileInput name="schoolLogo" label="School Logo" accept="image/*" required />

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" required className="accent-blue-500" />
                  <p className="text-sm text-gray-400">
                    By submitting this form, I agree to all{" "}
                    <a
                      href="/doc/CyberNex25_RnR.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Rules and Regulations
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1c1c2a] py-2 rounded-md font-medium text-white hover:bg-[#262636] focus:outline-none focus:ring-1 focus:ring-white transition"
                >
                  {submitting ? "Submitting..." : "Register"}
                </button>
              </form>

              <AnimatePresence>
                {message && (
                  <motion.div
                    key="toast"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md text-sm shadow-lg z-50 ${
                      message.success ? "bg-green-600" : "bg-red-500"
                    } text-white`}
                  >
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </main>
      </div>

      <FooterSection />
    </>
  );
}

/* ----------------- Reusable Components ----------------- */

function Input({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-[#1e1e2a] text-white rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white"
      />
    </div>
  );
}

function FileInput({
  name,
  label,
  accept,
  required = false,
}: {
  name: string;
  label: string;
  accept: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        required={required}
        className="w-full text-sm bg-[#1e1e2a] rounded px-3 py-2 text-white"
      />
    </div>
  );
}

function Select({
  name,
  label,
  value,
  onChange,
  options,
}: {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#1e1e2a] text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
