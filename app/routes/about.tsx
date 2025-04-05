// app/routes/about.tsx
import { Link } from "@remix-run/react";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">📽️ About CineSphere</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        CineSphere is a modern web-based movie booking platform built for a coding competition.
        The project simulates a real-world cinema ticketing experience where users can explore
        movies, view showtimes, and book seats online in an intuitive and interactive interface.
      </p>

      <h2 className="text-2xl font-semibold mb-2">✨ Key Features</h2>
      <ul className="list-disc ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
        <li>Admin dashboard for managing movies, showtimes, and seat allocation</li>
        <li>Dynamic movie listing with real-time booking support</li>
        <li>Auto-detected trailer previews using YouTube Data API</li>
        <li>Seat type differentiation (Standard / VIP) with pricing logic</li>
        <li>Booking history with name, email, and phone capture</li>
        <li>Total income calculation per movie & showtime (admin only)</li>
        <li>Responsive UI with dark mode support</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">🛠️ Tech Stack</h2>
      <ul className="list-disc ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
        <li>Remix.run + TypeScript for full-stack development</li>
        <li>TailwindCSS for styling and responsive layouts</li>
        <li>MySQL + MySQL2 for database operations</li>
        <li>OMDb API for enhanced movie metadata</li>
        <li><strong>YouTube Data API</strong> to automatically fetch official trailers</li>
        <li>Bcrypt for secure admin authentication</li>
      </ul>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        This was an end-to-end project that combined UI/UX, backend logic, third-party API integration,
        and real-world database operations in a single full-stack application. It was designed with
        scalability and modularity in mind.
      </p>

      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </main>
  );
}
