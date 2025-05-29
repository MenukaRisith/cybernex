import { useEffect, useState } from "react";
import NavBar from "~/components/NavBar";
import FooterSection from "~/components/Footer";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Leaderboard – CyberNex 2025" },
  ];
};

interface LeaderboardEntry {
  majorWins: string;
  otherWins: string;
  rank: string;
  school: string;
  marks: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch("/data/leaderboard.json")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <>
      <NavBar />
      <div className="relative bg-[#0d0d14] min-h-screen text-white font-[DM_SANS]">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/bg/Vector.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d14]/80 backdrop-blur-sm z-10" />

        {/* Content */}
        <div className="relative z-20 px-6 md:px-12 py-32 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[Montserrat] mb-10">
            CyberNex Leaderboard
          </h1>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 text-left text-sm md:text-base backdrop-blur-md rounded-lg overflow-hidden">
              <thead className="bg-white/10 text-white font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">School</th>
                  <th className="px-4 py-3">Major Wins</th>
                  <th className="px-4 py-3">Other Wins</th>
                  <th className="px-4 py-3">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/90">
                {entries.map((entry, i) => (
                  <tr key={i} className="hover:bg-white/5 transition">
                    <td className="px-4 py-3">{entry.rank}</td>
                    <td className="px-4 py-3">{entry.school}</td>
                    <td className="px-4 py-3">{entry.majorWins}</td>
                    <td className="px-4 py-3">{entry.otherWins}</td>
                    <td className="px-4 py-3">{entry.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Notes */}
          <div className="mt-16 text-left text-gray-300 space-y-6 max-w-2xl mx-auto text-sm md:text-base">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white font-[Montserrat] mb-2">
                Major Contests (Ragnar & Quizzara)
              </h2>
              <ul className="list-disc list-inside ml-4">
                <li>1st Place – 500 Points</li>
                <li>2nd Place – 300 Points</li>
                <li>3rd Place – 100 Points</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white font-[Montserrat] mb-2">
                Other Competitions
              </h2>
              <ul className="list-disc list-inside ml-4">
                <li>Web Development</li>
                <li>Game Development</li>
                <li>Algorithm</li>
                <li>Poster Design</li>
                <li>Manipulation Arts</li>
              </ul>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>1st Place – 200 Points</li>
                <li>2nd Place – 100 Points</li>
                <li>3rd Place – 50 Points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
