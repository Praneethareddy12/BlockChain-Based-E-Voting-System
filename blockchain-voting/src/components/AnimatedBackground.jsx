import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed -inset-1 z-0 pointer-events-none overflow-hidden">

      {/* Gradient Base */}
      <div
        className="absolute inset-0
        bg-gradient-to-br
        from-[#050814] via-[#070d1a] to-[#020617]
        animate-gradient"
        style={{
          transform: `translateY(${offset * 0.05}px)`
        }}
      />

      {/* Glow Orbs */}
      <div
        className="absolute top-[-10%] left-[-10%]
        w-[500px] h-[500px]
        bg-cyan-500/20 rounded-full blur-3xl
        animate-float-slow"
        style={{
          transform: `translateY(${offset * 0.1}px)`
        }}
      />

      <div
        className="absolute bottom-[-15%] right-[-10%]
        w-[600px] h-[600px]
        bg-blue-500/20 rounded-full blur-3xl
        animate-float-fast"
        style={{
          transform: `translateY(${offset * 0.15}px)`
        }}
      />

      <div
        className="absolute top-[30%] right-[20%]
        w-[300px] h-[300px]
        bg-purple-500/10 rounded-full blur-2xl
        animate-float-medium"
        style={{
          transform: `translateY(${offset * 0.08}px)`
        }}
      />
    </div>
  );
}
