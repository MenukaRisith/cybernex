import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import {
  json,
  redirect,
  createCookieSessionStorage,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
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

interface Movie {
  id: number;
  title: string;
  genre: string;
  release_date: string;
  poster_url: string;
}

interface Booking {
  id: number;
  seat_ids: string;
  created_at: string;
  total_price: number;
  showtime_id: number;
  name: string | null;
  email: string | null;
}

interface Showtime {
  id: number;
  movie_id: number;
  datetime: string;
  theater_name: string;
  title: string;
}

interface Seat {
  id: number;
  seat_number: string;
  seat_type: string;
  is_booked: 0 | 1;
  showtime_id: number;
}

interface AdminLoaderData {
  loggedIn: boolean;
  username: string;
  movies: Movie[];
  bookings: Booking[];
  showtimes: Showtime[];
  seats: Seat[];
  movieIncomeMap: Record<number, number>;
  showtimeIncomeMap: Record<number, number>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const isLoggedIn = session.get("loggedIn") === true;
  const adminUsername = session.get("adminUsername") || "";

  if (!isLoggedIn) return redirect("/login");

  const db = await connectDB();

  const [movies] = await db.query("SELECT * FROM movies ORDER BY release_date DESC");
  const [bookings] = await db.query(`
    SELECT b.*, u.name, u.email
    FROM bookings b
    LEFT JOIN users u ON b.user_id = u.id
    ORDER BY b.id DESC
  `);
  const [showtimes] = await db.query(`
    SELECT s.*, m.title FROM showtimes s
    JOIN movies m ON s.movie_id = m.id ORDER BY s.datetime DESC
  `);
  const [seats] = await db.query(`
    SELECT * FROM seats ORDER BY showtime_id, seat_number ASC
  `);

  const movieIncomeMap: Record<number, number> = {};
  const showtimeIncomeMap: Record<number, number> = {};

  (bookings as Booking[]).forEach((booking) => {
    const show = (showtimes as Showtime[]).find(s => s.id === booking.showtime_id);
    if (show) {
      movieIncomeMap[show.movie_id] = (movieIncomeMap[show.movie_id] || 0) + (booking.total_price || 0);
      showtimeIncomeMap[show.id] = (showtimeIncomeMap[show.id] || 0) + (booking.total_price || 0);
    }
  });

  return json({
    loggedIn: true,
    username: adminUsername,
    movies,
    bookings,
    showtimes,
    seats,
    movieIncomeMap,
    showtimeIncomeMap,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const intent = form.get("_action");
  const db = await connectDB();

  if (intent === "logout") {
    const session = await storage.getSession(request.headers.get("Cookie"));
    return redirect("/login", {
      headers: { "Set-Cookie": await storage.destroySession(session) },
    });
  }

  if (intent === "addMovie") {
    const title = form.get("title")?.toString();
    const genre = form.get("genre")?.toString();
    const release = form.get("release_date")?.toString();
    const poster = form.get("poster_url")?.toString();

    if (title && genre && release && poster) {
      await db.query(
        "INSERT INTO movies (title, genre, release_date, poster_url) VALUES (?, ?, ?, ?)",
        [title, genre, release, poster]
      );
    }
    return redirect("/admin");
  }

  if (intent === "addShowtime") {
    const movieId = form.get("movie_id")?.toString();
    const datetime = form.get("datetime")?.toString();
    const theater = form.get("theater_name")?.toString();

    if (movieId && datetime && theater) {
      await db.query(
        "INSERT INTO showtimes (movie_id, datetime, theater_name) VALUES (?, ?, ?)",
        [movieId, datetime, theater]
      );
    }
    return redirect("/admin");
  }

  if (intent === "addSeat") {
    const showtimeId = form.get("showtime_id")?.toString();
    const seatNumber = form.get("seat_number")?.toString();
    const seatType = form.get("seat_type")?.toString();

    if (showtimeId && seatNumber && seatType) {
      await db.query(
        "INSERT INTO seats (seat_number, seat_type, is_booked, showtime_id) VALUES (?, ?, 0, ?)",
        [seatNumber, seatType, showtimeId]
      );
    }
    return redirect("/admin");
  }

  return null;
};

export default function AdminPanel() {
  const {
    username,
    movies,
    bookings,
    showtimes,
    seats,
    movieIncomeMap,
    showtimeIncomeMap,
  } = useLoaderData<AdminLoaderData>();

  const [tab, setTab] = useState<"dashboard" | "movies" | "bookings" | "showtimes" | "seats">("dashboard");

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">🎬 CineSphere Admin</h1>
          <p className="text-sm text-gray-500">Logged in as: {username}</p>
        </div>
        <Form method="post">
          <button name="_action" value="logout" type="submit" className="bg-red-600 text-white px-4 py-1 rounded">Logout</button>
        </Form>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        {["dashboard", "movies", "bookings", "showtimes", "seats"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as typeof tab)}
            className={`py-2 px-4 rounded ${tab === t ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div className="space-y-2">
          <p>🎥 Movies: {movies.length}</p>
          <p>📅 Showtimes: {showtimes.length}</p>
          <p>💺 Seats: {seats.length}</p>
          <p>🎟️ Bookings: {bookings.length}</p>
        </div>
      )}

      {tab === "movies" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Movies</h2>
          <Form method="post" className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
            <input name="title" placeholder="Title" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            <input name="genre" placeholder="Genre" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            <input name="release_date" type="date" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            <input name="poster_url" placeholder="Poster URL" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            <button type="submit" name="_action" value="addMovie" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Movie</button>
          </Form>
          {movies.map((m) => (
            <div key={m.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h3 className="font-bold">{m.title}</h3>
              <p>{m.genre} — {new Date(m.release_date).toLocaleDateString()}</p>
              <p className="text-green-600 font-medium">💰 Income: Rs. {movieIncomeMap[m.id] || 0}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "showtimes" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Showtimes</h2>
          <Form method="post" className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
            <select name="movie_id" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700">
              <option value="">Select Movie</option>
              {movies.map((m) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
            <input name="datetime" type="datetime-local" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            <input name="theater_name" placeholder="Theater Name" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            <button type="submit" name="_action" value="addShowtime" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Showtime</button>
          </Form>
          {showtimes.map((s) => (
            <div key={s.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <p>{s.title}</p>
              <p>{s.theater_name} — {new Date(s.datetime).toLocaleString()}</p>
              <p className="text-green-600 font-medium">💰 Income: Rs. {showtimeIncomeMap[s.id] || 0}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "seats" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Seats</h2>
          <Form method="post" className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
            <select name="showtime_id" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700">
              <option value="">Select Showtime</option>
              {showtimes.map((s) => (
                <option key={s.id} value={s.id}>{s.title} — {new Date(s.datetime).toLocaleString()}</option>
              ))}
            </select>
            <input name="seat_number" placeholder="Seat Number (e.g., A1)" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            <select name="seat_type" required className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700">
              <option value="standard">Standard</option>
              <option value="vip">VIP</option>
            </select>
            <button type="submit" name="_action" value="addSeat" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Seat</button>
          </Form>
          {seats.map((s) => (
            <div key={s.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow">
              <p>Seat {s.seat_number} ({s.seat_type}) — {s.is_booked ? "Booked" : "Available"} (Showtime ID: {s.showtime_id})</p>
            </div>
          ))}
        </div>
      )}

      {tab === "bookings" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Bookings</h2>
          {bookings.map((b) => (
            <div key={b.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow">
              <p>🪑 Seat(s): {b.seat_ids}</p>
              <p>📧 Email: {b.email || "Unknown"}</p>
              <p>👤 Name: {b.name || "Unknown"}</p>
              <p>🕒 {new Date(b.created_at).toLocaleString()}</p>
              <p>💵 Total: Rs. {b.total_price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
