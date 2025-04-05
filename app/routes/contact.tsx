import { MetaFunction, ActionFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us - CineSphere" },
    { name: "description", content: "Get in touch with CineSphere for support, feedback, or inquiries." },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("Dummy contact form submitted:", {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  return json({ success: true });
};

export default function ContactPage() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Have questions, feedback, or need support? Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>

        {actionData?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            🎉 Thank you for your message! But here’s the thing... this is just a dummy form.
            <br />
            Don&apos;t worry, your message is safely stored in the depths of the internet — somewhere between Mars and the Moon 🌙🚀
          </div>
        )}

        <Form method="post" className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="mt-1 block w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </Form>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p><strong>📞 Phone:</strong> <a href="tel:+94760017055" className="text-blue-600 hover:underline">+94 76 001 7055</a></p>
          <p><strong>📧 Email (Personal):</strong> <a href="mailto:menuka.contact@gmail.com" className="text-blue-600 hover:underline">menuka.contact@gmail.com</a></p>
          <p><strong>📧 Email (Society):</strong> <a href="mailto:info.kccicts@gmail.com" className="text-blue-600 hover:underline">info.kccicts@gmail.com</a></p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        <div className="rounded overflow-hidden shadow-lg">
          <iframe
            title="Kekirawa Central College Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.546892092659!2d80.59680117591848!3d8.039828204274059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c6952607dc97%3A0x9dcd51cb07cdbc16!2sKekirawa%20Central%20College!5e0!3m2!1sen!2slk!4v1712296278569!5m2!1sen!2slk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
