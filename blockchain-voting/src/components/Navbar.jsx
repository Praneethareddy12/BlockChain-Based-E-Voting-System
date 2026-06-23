import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Home,
  Lock,
  Vote,
  Link as LinkIcon,
  Search,
  Brain,
  Settings,
  LogOut
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Authenticate", path: "/authenticate", icon: Lock },
    { name: "Vote", path: "/vote", icon: Vote },
    { name: "Blockchain", path: "/blockchain", icon: LinkIcon },
    { name: "Verify", path: "/verify", icon: Search },
    { name: "AI Security", path: "/ai-security", icon: Brain },
    { name: "Admin", path: "/admin", icon: Settings },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0b1220]/80 backdrop-blur-md border-b border-cyan-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/30">
            <Shield className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-cyan-400 font-bold text-lg">
              SecureVote
            </h1>
            <p className="text-xs text-gray-400">
              BLOCKCHAIN E-VOTING
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 shadow-md shadow-cyan-500/20"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5"
                }`}
              >
                <Icon size={16} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="text-white text-sm">Admin</p>
            <p className="text-xs text-cyan-400">Administrator</p>
          </div>
          <LogOut
            size={18}
            className="text-gray-400 hover:text-cyan-400 cursor-pointer transition"
          />
        </div>
      </div>
    </nav>
  );
}
