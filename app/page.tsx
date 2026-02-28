import Navbar from "@/app/components/Navbar";
import Silk from "./components/Silk";
import Services from "@/app/components/Services";
import About from "@/app/components/About";
import FeatureTyres from "@/app/components/FeatureTyres";
import Brands from "./components/Brands";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

const Page = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0f0e11] text-white selection:bg-yellow-500/30 overflow-x-hidden">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Silk
          speed={2}
          scale={1.4}
          color="#FFC83D"
          noiseIntensity={0.6}
          rotation={15}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden ">
        {/* --- BACKGROUND ARCHITECTURE --- */}
        {/* Grid Pattern */}

        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-yellow-500/10 blur-[120px] rounded-full opacity-50" />

        {/* --- CONTENT --- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          {/* Floating Badge */}
          <div className="mb-8 group">
            <div className="flex items-center gap-3 px-5 py-2 bg-white/2 border border-white/10 rounded-full backdrop-blur-md group-hover:border-yellow-500/40 transition-all duration-500">
              <div className="relative flex h-2 w-2">
                <div className="animate-ping absolute inset-0 rounded-full bg-yellow-500 opacity-40"></div>
                <div className="relative rounded-full h-2 w-2 bg-yellow-500"></div>
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/50 group-hover:text-yellow-500 transition-colors">
                Performance Engineering
              </span>
            </div>
          </div>

          {/* Cinematic Title */}
          <div className="text-center">
            <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-black leading-[0.8] tracking-tighter uppercase italic text-white">
              <span className="block mb-2">UNMATCHED</span>
              <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-b from-yellow-300 via-yellow-500 to-yellow-800">
                PERFORMANCE
                {/* Static Light Glare Effect (No Keyframes) */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
              </span>
            </h1>
          </div>

          {/* Descriptive Text with Side Bars */}
          <div className="mt-12 mb-16 flex items-center gap-8 group">
            <div className="h-1 w-12 bg-white/10 group-hover:w-20 group-hover:bg-yellow-500 transition-all duration-700" />
            <p className="max-w-2xl text-lg md:text-2xl text-white/40 font-extralight leading-relaxed italic text-center">
              At <span className="text-white font-bold">BAVAAS TYRES</span>, we
              master the interface between{" "}
              <span className="text-yellow-500">power</span> and asphalt.
            </p>
            <div className="h-1 w-12 bg-white/10 group-hover:w-20 group-hover:bg-yellow-500 transition-all duration-700" />
          </div>

          {/* Action Center */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Primary Button */}
            <button className="group relative px-12 py-5 bg-yellow-500 rounded-xl overflow-hidden shadow-[0_0_30px_-10px_rgba(234,179,8,0.3)] transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 text-black font-black uppercase tracking-tighter text-lg">
                Explore Collections
              </span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>

            {/* Secondary Button */}
            <button className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden transition-all hover:bg-white/10 active:scale-95">
              <span className="relative z-10 text-white font-bold uppercase tracking-tighter text-lg group-hover:text-yellow-400 transition-colors">
                Book a Service
              </span>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </header>
      <About />
      <Services />
      <FeatureTyres />
      <Brands />
      <Testimonials />
      <CallToAction/>
      <Footer/>
    </div>
  );
};

export default Page;
