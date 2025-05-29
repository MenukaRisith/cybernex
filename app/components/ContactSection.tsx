export default function ContactSection() {
  const contacts = [
    {
      role: "President",
      name: "Menuka Risith",
      phone: "+94 76 001 7055",
    },
    {
      role: "Vice-President",
      name: "Dewmika Supeshala",
      phone: "+94 76 744 2129",
    },
    {
      role: "Coordinator",
      name: "Nehara Kavisha",
      phone: "+94 70 413 4979",
    },
    {
      role: "Coordinator",
      name: "Rumitha Yethmin",
      phone: "+94 70 225 1256",
    },
  ];

  return (
    <section id="contact" className="w-full flex flex-col items-center justify-center py-16 px-4 text-white">
      <h2 className="text-[32px] md:text-[44px] font-[Montserrat] font-bold text-center uppercase mb-12">
        COMMITTEE
      </h2>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-[1160px]">
        {contacts.map((person, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-start w-[500px] gap-4 p-[24px] rounded-[16px] bg-white/[0.01] border border-white/25 backdrop-blur-[8px]"
          >
            <div className="flex flex-col justify-start items-start">
              <p className="text-2xl font-bold uppercase text-white">
                {person.role}
              </p>
              <p className="w-[280px] text-lg font-medium text-left text-white">
                {person.name}
              </p>
            </div>

            <div className="flex justify-start items-start gap-2 flex-wrap">
              {/* Phone Button */}
              <a
                href={`tel:${person.phone.replace(/\s+/g, "")}`}
                className="flex justify-center items-center h-[44px] gap-2 px-5 py-2.5 rounded-[10px] border border-white/25 transition-all duration-200 hover:bg-white/10"
              >
                <i className="fas fa-phone text-white text-lg transition duration-200" />
                <p className="text-base font-medium uppercase text-white transition duration-200">
                  {person.phone}
                </p>
              </a>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${person.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center h-[44px] gap-2 px-5 py-2.5 rounded-[10px] border border-white/25 transition-all duration-200 hover:bg-green-500/20"
              >
                <i className="fab fa-whatsapp text-white text-lg transition duration-200" />
                <p className="text-base font-medium uppercase text-white transition duration-200">
                  {person.phone}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
