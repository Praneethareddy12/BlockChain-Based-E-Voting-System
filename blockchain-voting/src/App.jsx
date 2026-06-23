import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Authenticate from "./pages/Authenticate";
import Vote from "./pages/Vote";
import Blockchain from "./pages/Blockchain";
import Verify from "./pages/Verify";
import AISecurity from "./pages/AISecurity";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* Layout Wrapper (Navbar + Footer + Background inside it) */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/ai-security" element={<AISecurity />} />
          <Route path="/admin" element={<Admin />} />

        </Route>

      </Routes>
    </Router>
  );
}
