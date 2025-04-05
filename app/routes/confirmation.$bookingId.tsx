import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { connectDB } from "~/lib/db.server";
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

type ConfirmationData = {
  bookingId: number;
  seat_ids: string;
  total_price: number;
  name: string;
  email: string;
  theater_name: string;
  datetime: string;
  movie_title: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const bookingId = params.bookingId;

  if (!bookingId) {
    throw new Response("Booking ID not provided", { status: 400 });
  }

  const db = await connectDB();

  const [rows] = await db.query(
    `
    SELECT 
      b.id as bookingId,
      b.seat_ids,
      b.total_price,
      u.name,
      u.email,
      s.theater_name,
      s.datetime,
      m.title as movie_title
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN showtimes s ON b.showtime_id = s.id
    JOIN movies m ON s.movie_id = m.id
    WHERE b.id = ?
  `,
    [bookingId]
  );

  const booking = (rows as ConfirmationData[])[0];

  if (!booking) {
    throw new Response("Booking not found", { status: 404 });
  }

  return json(booking);
};

export default function ConfirmationPage() {
  const {
    bookingId,
    seat_ids,
    total_price,
    name,
    email,
    theater_name,
    datetime,
    movie_title,
  } = useLoaderData<ConfirmationData>();

  const printableRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printableRef.current) {
      const printContents = printableRef.current.innerHTML;
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Booking Confirmation</title></head>
            <body>${printContents}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const qrValue = `Booking ID: ${bookingId}\nMovie: ${movie_title}\nTheater: ${theater_name}\nTime: ${new Date(datetime).toLocaleString()}\nSeats: ${seat_ids}\nTotal: Rs.${total_price}`;

  return (
    <main className="max-w-xl mx-auto px-6 py-10 text-center">
      <h1 className="text-3xl font-bold mb-6 text-green-600">✅ Booking Confirmed</h1>

      {/* Printable section */}
      <div ref={printableRef} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-left space-y-4">
        <p><strong>🎟️ Booking ID:</strong> #{bookingId}</p>
        <p><strong>🎬 Movie:</strong> {movie_title}</p>
        <p><strong>🏢 Theater:</strong> {theater_name}</p>
        <p><strong>🗓️ Showtime:</strong> {new Date(datetime).toLocaleString()}</p>
        <p><strong>💺 Seats:</strong> {seat_ids}</p>
        <p><strong>💰 Total:</strong> Rs. {total_price.toLocaleString()}</p>
        <p><strong>🙋 Name:</strong> {name}</p>
        <p><strong>📧 Email:</strong> {email}</p>

        <div className="mt-4 text-center">
          <QRCodeCanvas value={qrValue} size={150} />
          <p className="text-sm text-gray-500 mt-2">Scan to verify booking</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handlePrint}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded"
        >
          🖨️ Print / Download PDF
        </button>

        <Link
          to="/movies"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          🎟️ Book Another Ticket
        </Link>
      </div>
    </main>
  );
}
