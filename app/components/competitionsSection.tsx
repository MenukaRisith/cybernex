import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function CompetitionsSection() {
  const [selected, setSelected] = useState("All");
  const navigate = useNavigate();

  const competitions = [
    {
      name: "Quizzara",
      borderColor: "#fcb833",
      btnColor: "#fcb833",
      bgColor: "#fcb8330D",
      borderLight: "#fcb83340",
      logoUrl: "/images/comp/quizzara.svg",
      category: "Quiz",
      description:
        "A thrilling team-based ICT quiz challenge testing logic, tech knowledge, and speed under pressure.",
    },
    {
      name: "Pixora",
      borderColor: "#ffffff",
      btnColor: "#ffffff",
      bgColor: "#ffffff0D",
      borderLight: "#ffffff40",
      logoUrl: "/images/comp/pixora.svg",
      category: "Design",
      description:
        "Unleash your creativity and design skills in our poster design and manipulation arts competition focused on digital expression.",
    },
    {
      name: "Codexa",
      borderColor: "#01ffb7",
      btnColor: "#01ffb7",
      bgColor: "#01ffb70D",
      borderLight: "#01ffb740",
      logoUrl: "/images/comp/codexa.svg",
      category: "Development",
      description:
        "Showcase your web, app and game development expertise through innovative coding challenges and UI battles.",
    },
    {
      name: "Ragnar",
      borderColor: "#fff200",
      btnColor: "#fff200",
      bgColor: "#fff2000D",
      borderLight: "#fff20040",
      logoUrl: "/images/comp/ragnar.svg",
      category: "Gaming",
      description:
        "A competitive eSports showdown where strategy, reflex, and teamwork determine the ultimate champions.",
    },
  ];

  const filters = ["All", "Design", "Development", "Gaming"];
  const filtered =
    selected === "All"
      ? competitions
      : competitions.filter((c) => c.category === selected);

  return (
    <section className="relative w-full flex flex-col items-center text-white py-16 px-4 overflow-hidden">
      <div className="relative z-10 w-full flex flex-col items-center">
        <h2 className="text-[28px] md:text-[40px] font-[Montserrat] font-bold uppercase text-center mb-3">
          COMPETITIONS
        </h2>

        <p className="w-full max-w-[720px] text-sm md:text-base font-[DM_SANS] font-medium text-center text-white/90 mb-8">
          CyberNex, organized by the ICT Society of Kekirawa Central College, is the first-ever ICT Day in the North Central Province, featuring dynamic competitions that challenge creativity, coding, design, and gaming skills.
        </p>

        {/* Filter Menu */}
        <div className="flex flex-wrap justify-center items-center h-auto gap-2 p-[3px] rounded-[20px] bg-[#09101E] mb-10">
          {filters.map((label) => (
            <button
              key={label}
              onClick={() => setSelected(label)}
              className={`flex justify-center items-center h-[38px] md:h-[42px] px-4 md:px-5 py-1.5 rounded-[20px] text-sm md:text-base font-medium text-white transition-all duration-200 ${
                selected === label ? "bg-[#4d76f4]/[0.34]" : "hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Competition Cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-[1160px]">
          {filtered.map((comp, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-start h-[440px] w-[320px] px-6 pt-10 pb-6 rounded-[20px] backdrop-blur-[4px]"
              style={{
                border: `1px solid ${comp.borderLight}`,
                backgroundColor: comp.bgColor,
              }}
            >
              <div className="flex flex-col justify-start items-start gap-8 w-full">
                <div className="w-full">
                  <img
                    src={comp.logoUrl}
                    alt={comp.name}
                    className="h-[50px] object-contain"
                  />
                </div>
                <p className="text-base font-medium text-left text-white">
                  {comp.description}
                </p>
              </div>

              <div className="flex justify-between items-center w-full mt-6">
                <button
                  onClick={() => navigate("/register")}
                  className="w-[190px] h-[44px] flex justify-center items-center gap-2.5 px-6 py-2.5 rounded-[10px] border transition duration-200 text-sm font-semibold uppercase"
                  style={{ borderColor: comp.btnColor, color: comp.btnColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = comp.btnColor;
                    e.currentTarget.style.color = "#121100";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = comp.btnColor;
                  }}
                >
                  Register Now
                </button>

                <button
                  onClick={() => navigate(`/${comp.name.toLowerCase()}`)}
                  className="w-[44px] h-[44px] flex justify-center items-center rounded-[10px] transition duration-200"
                  style={{ backgroundColor: comp.btnColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <i className="fas fa-info text-[#121100] text-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
