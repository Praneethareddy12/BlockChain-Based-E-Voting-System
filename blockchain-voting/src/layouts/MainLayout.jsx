import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="relative min-h-screen text-white bg-transparent">

      {/* Animated Background for ALL pages */}
      <AnimatedBackground />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pt-24">
          <Outlet />
        </main>

        <Footer />
      </div>

    </div>
  );
}
