export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden flex items-center justify-center">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <p className="text-base md:text-lg font-semibold font-[Montserrat] text-white uppercase tracking-widest">
          First Ever ICT Day in North Central Province
        </p>

        <img
          src="/images/logo.png"
          alt="CyberNex Logo"
          className="w-[600px] md:w-[720px] mt-8"
        />

        <p className="max-w-2xl mt-8 text-base font-[DM_SANS] md:text-lg text-white/90 leading-relaxed">
          CyberNex is the first-ever ICT Day in the North Central Province, organized by the ICT Society of Kekirawa Central College. It brings together young innovators through competitive and collaborative events to celebrate technology, creativity, and the future of digital education.
        </p>
      </div>
    </section>
  );
}
