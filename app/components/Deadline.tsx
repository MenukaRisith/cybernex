import { useEffect, useState } from "react";

export default function Deadline() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-07-03T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-white pt-16 pb-28 px-4 text-center">
      <h2 className="text-[30px] font-[Montserrat] md:text-[44px] font-bold uppercase mb-4">
        Clock is ticking!
      </h2>
      <p className="text-base md:text-lg font-[DM_SANS] font-medium max-w-2xl mx-auto mb-12">
        CyberNex is the first-ever ICT Day in the North Central Province, hosted by the ICT Society of Kekirawa Central College. Join the race before the deadline and compete in innovative challenges across coding, design, quizzes, and gaming.
      </p>

      <div className="flex justify-center items-center gap-[30px] flex-wrap">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((unit) => (
          <div key={unit.label} className="w-[110px] h-[130px] relative">
            <p className="text-[44px] md:text-[58px] font-bold leading-tight">
              {String(unit.value).padStart(2, "0")}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium uppercase mt-2">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
