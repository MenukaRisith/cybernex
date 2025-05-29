import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";

interface LeaderboardEntry {
  rank: string;
  school: string;
  marks: number;
}

export default function LeaderboardSection() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/leaderboard.json")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error("Failed to load leaderboard:", err));
  }, []);

  const topFive = entries.slice(0, 5);

  return (
    <section className="flex flex-col items-center justify-center py-10 px-4 text-white font-[DM_SANS]">
      <div className="text-center max-w-[1440px] w-full mb-8">
        <h2 className="text-[32px] md:text-[44px] font-bold uppercase font-[Montserrat]">Leaderboard</h2>
        <p className="text-xs md:text-sm font-[DM_SANS] font-medium max-w-[860px] mx-auto mt-2">
          CyberNex, organized by the ICT Society of Kekirawa Central College, is the first-ever ICT Day in the North Central Province. It features a range of innovative competitions in coding, design, gaming, and tech-based problem solving.
        </p>
      </div>

      <div className="w-full max-w-[1100px] bg-[#4d76f4]/10 p-4 rounded-[14px] flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#09101e] p-[4px] rounded-[8px]">
          <div className="relative w-[240px] h-10">
            <div className="absolute left-[5px] top-[4px] px-3 py-1.5 rounded-[30px]">
              <p className="text-xs md:text-sm font-medium text-white text-center">Rank</p>
            </div>
            <div className="absolute left-[110px] top-[4px] px-3 py-1.5 rounded-[30px]">
              <p className="text-xs md:text-sm font-medium text-white text-center">School</p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-[30px]">
            <p className="text-xs md:text-sm font-medium text-white text-center">Marks</p>
          </div>
        </div>

        {/* Top Entries */}
        <div className="flex flex-col gap-3">
          {topFive.map((entry, i) => (
            <div
              key={i}
              className="flex justify-between items-center w-full p-[4px] border-b border-white/30"
            >
              <div className="relative w-[500px] h-10">
                <div className="absolute left-[5px] top-[4px] px-3 py-1.5 rounded-[30px]">
                  <p className="text-xs md:text-sm font-medium text-white text-center">{entry.rank}</p>
                </div>
                <div className="absolute left-[110px] top-[4px] px-3 py-1.5 rounded-[30px]">
                  <p className="text-xs md:text-sm font-medium text-white text-center">{entry.school}</p>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-[30px]">
                <p className="text-xs md:text-sm font-medium text-white text-center">{entry.marks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <button
        onClick={() => navigate("/leaderboard")}
        className="mt-6 flex items-center gap-2 px-5 py-2 border border-white/25 rounded-[8px] bg-[#4d76f4]/10 hover:bg-[#4d76f4]/20 transition"
      >
        <i className="fas fa-right-left text-white text-sm md:text-base"></i>
        <p className="text-xs md:text-sm font-medium uppercase text-white">See full leaderboard</p>
      </button>
    </section>
  );
}
