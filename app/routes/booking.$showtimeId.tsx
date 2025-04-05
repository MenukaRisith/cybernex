import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { connectDB } from "~/lib/db.server";
import { useState } from "react";
import type { ResultSetHeader } from "mysql2";

// --- Types ---
interface Seat {
  id: number;
  seat_number: string;
  seat_type: "standard" | "vip";
  is_booked: 0 | 1;
}

interface Movie {
  id: number;
  title: string;
}

interface Showtime {
  id: number;
  movie_id: number;
  datetime: string;
  theater_name: string;
}

// --- Loader ---
export const loader: LoaderFunction = async ({ params }) => {
  const db = await connectDB();

  const [showtimeResult] = await db.query(
    "SELECT * FROM showtimes WHERE id = ?",
    [params.showtimeId]
  );
  const showtime = (showtimeResult as Showtime[])[0];

  const [movieResult] = await db.query(
    "SELECT * FROM movies WHERE id = ?",
    [showtime.movie_id]
  );
  const movie = (movieResult as Movie[])[0];

  const [seatResult] = await db.query(
    "SELECT * FROM seats WHERE showtime_id = ? ORDER BY seat_number ASC",
    [params.showtimeId]
  );
  const seats = seatResult as Seat[];

  return json({ movie, showtime, seats });
};

// --- Action ---
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const selectedSeats = formData.getAll("seats") as string[];
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const total = formData.get("total")?.toString() || "0";

  const db = await connectDB();

  // Create or find user
  const [userRows] = await db.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
  const existingUser = userRows as { id: number }[];

  let userId: number;
  if (existingUser.length > 0) {
    userId = existingUser[0].id;
  } else {
    const [insertResult] = await db.query(
      "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );
    const result = insertResult as ResultSetHeader;
    userId = result.insertId;
  }

  // Insert booking
  const [bookingResult] = await db.query(
    "INSERT INTO bookings (user_id, showtime_id, seat_ids, total_price) VALUES (?, ?, ?, ?)",
    [userId, params.showtimeId, selectedSeats.join(","), total]
  );
  const booking = bookingResult as ResultSetHeader;

  // Mark seats as booked
  await Promise.all(
    selectedSeats.map((id) =>
      db.query("UPDATE seats SET is_booked = 1 WHERE id = ?", [id])
    )
  );

  return redirect(`/confirmation/${booking.insertId}`);
};

// --- Component ---
export default function Booking() {
  const { movie, showtime, seats } = useLoaderData<{
    movie: Movie;
    showtime: Showtime;
    seats: Seat[];
  }>();

  const [selected, setSelected] = useState<number[]>([]);
  const navigation = useNavigation();

  const toggleSeat = (seat: Seat) => {
    if (seat.is_booked) return;
    setSelected((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const selectedSeatObjects = seats.filter((seat) => selected.includes(seat.id));
  const totalPrice = selectedSeatObjects.reduce((acc, seat) => {
    return acc + (seat.seat_type === "vip" ? 1000 : 500);
  }, 0);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Book Your Seat</h1>
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        {movie.title} — {new Date(showtime.datetime).toLocaleString()} —{" "}
        {showtime.theater_name}
      </p>

      {/* Seat Grid */}
      <div className="grid grid-cols-8 gap-2 mb-6">
        {seats.map((seat) => {
          const isSelected = selected.includes(seat.id);
          const isBooked = seat.is_booked === 1;

          const baseClass =
            "text-sm text-center py-2 rounded transition-all focus:outline-none";
          const stateClass = isBooked
            ? "bg-gray-400 text-white cursor-not-allowed"
            : isSelected
            ? "bg-blue-600 text-white"
            : seat.seat_type === "vip"
            ? "bg-yellow-400 text-black"
            : "bg-green-500 text-black";

          return (
            <button
              key={seat.id}
              type="button"
              className={`${baseClass} ${stateClass}`}
              onClick={() => toggleSeat(seat)}
              disabled={isBooked}
              aria-pressed={isSelected}
              title={`Seat ${seat.seat_number} (${seat.seat_type})`}
            >
              {seat.seat_number}
            </button>
          );
        })}
      </div>

      {/* Total */}
      <div className="mb-4 text-right font-semibold text-lg text-gray-800 dark:text-gray-200">
        Total: Rs. {totalPrice.toLocaleString()}
      </div>

      {/* Booking Form */}
      <Form method="post">
        {selected.map((id) => (
          <input key={id} type="hidden" name="seats" value={id} />
        ))}
        <input type="hidden" name="total" value={totalPrice} />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4">
          <input
            name="name"
            placeholder="Your Name"
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            required
            className="p-2 rounded bg-gray-100 dark:bg-gray-800 sm:col-span-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={selected.length === 0 || navigation.state === "submitting"}
        >
          {navigation.state === "submitting"
            ? "Booking..."
            : `Confirm Booking (Rs. ${totalPrice})`}
        </button>
      </Form>
    </main>
  );
}
