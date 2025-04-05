import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { connectDB } from "../lib/db.server";

type Movie = {
  id: number;
  title: string;
  genre: string;
  poster_url: string;
  release_date: string;
};

export const loader: LoaderFunction = async () => {
  const db = await connectDB();
  const [movies] = await db.query("SELECT * FROM movies ORDER BY release_date DESC LIMIT 10");
  return json({ movies });
};

export default function Index() {
  const { movies } = useLoaderData<typeof loader>() as { movies: Movie[] };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
          >
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-100 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {movie.genre}
              </p>
              <p className="text-sm">
                🎬 {new Date(movie.release_date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
