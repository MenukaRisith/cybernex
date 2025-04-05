import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link, useNavigate } from "@remix-run/react";
import { connectDB } from "~/lib/db.server";

type Movie = {
  id: number;
  title: string;
  genre: string;
  synopsis: string;
  release_date: string;
  poster_url: string;
};

type Showtime = {
  id: number;
  datetime: string;
  theater_name: string;
};

type OmdbData = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
  Response: string;
};

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const YOUTUBE_API_KEY = "AIzaSyA9HQWOvCczITOoSAyZOd_WRxp-mOgbavs";

export const loader: LoaderFunction = async ({ params }) => {
  const db = await connectDB();

  const [movieRowsRaw] = await db.query("SELECT * FROM movies WHERE id = ?", [params.movieId]);
  const movieRows = movieRowsRaw as Movie[];

  if (!movieRows || movieRows.length === 0) {
    throw new Response("Movie not found", { status: 404 });
  }

  const movie = movieRows[0];

  // Fetch OMDb data
  let omdb: OmdbData | null = null;
  if (OMDB_API_KEY) {
    try {
      const omdbRes = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${OMDB_API_KEY}`);
      const data = await omdbRes.json();
      if (data.Response === "True") {
        omdb = data;
      }
    } catch (e) {
      console.error("OMDb API error", e);
    }
  }

  // Auto-fetch trailer from YouTube
  let trailerUrl = "";
  try {
    const query = `${movie.title} Official Trailer`;
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
        query
      )}&key=${YOUTUBE_API_KEY}`
    );
    const ytData = await ytRes.json();
    if (ytData.items && ytData.items.length > 0) {
      const videoId = ytData.items[0].id.videoId;
      trailerUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
    console.error("YouTube API Error:", e);
  }

  // Showtimes
  const [showtimeRowsRaw] = await db.query(
    "SELECT * FROM showtimes WHERE movie_id = ? ORDER BY datetime ASC",
    [params.movieId]
  );
  const showtimeRows = showtimeRowsRaw as Showtime[];

  return json({ movie, showtimes: showtimeRows, omdb, trailerUrl });
};

export default function MovieDetails() {
  const { movie, showtimes, omdb, trailerUrl } = useLoaderData<{
    movie: Movie;
    showtimes: Showtime[];
    omdb: OmdbData | null;
    trailerUrl: string;
  }>();

  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline"
      >
        ← Back to Movies
      </button>

      {/* Movie Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            🎭 Genre: {movie.genre}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            📅 Release Date: {new Date(movie.release_date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{movie.synopsis}</p>

          {omdb && (
            <div className="mb-6 text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <p>🎬 Director: {omdb.Director}</p>
              <p>✍️ Writer: {omdb.Writer}</p>
              <p>👥 Cast: {omdb.Actors}</p>
              <p>⏱️ Runtime: {omdb.Runtime}</p>
              <p>⭐ IMDb Rating: {omdb.imdbRating}</p>
              <p>🏆 Awards: {omdb.Awards}</p>
            </div>
          )}

          {/* Showtimes */}
          <h2 className="text-xl font-semibold mb-2">Available Showtimes</h2>
          <ul className="space-y-3">
            {showtimes.map((showtime) => (
              <li
                key={showtime.id}
                className="flex justify-between items-center border border-gray-300 dark:border-gray-700 p-3 rounded-md"
              >
                <div>
                  <p className="font-medium">{showtime.theater_name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(showtime.datetime).toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/booking/${showtime.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Book Now
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trailer */}
      {trailerUrl && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Watch Trailer</h2>
          <div className="relative w-full" style={{ paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={trailerUrl}
              title="Movie Trailer"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow"
            />
          </div>
        </div>
      )}
    </main>
  );
}
