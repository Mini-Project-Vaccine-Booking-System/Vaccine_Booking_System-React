import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBarList from "./config/NavbarList";
import { Dashboard } from "./pages/Dashboard";
import { AturTiketVaksin } from "./pages/aturTiketVaksin/pendaftaran/AturTiketVaksin";
import { KelolaPesananTiket } from "./pages/kelolaPesananTiket/KelolaPesananTiket";
import { AturVaksin } from "./pages/aturVaksin/aturVaksin";
import { SesiTersedia } from "./pages/aturTiketVaksin/sesiTersedia/SesiTersedia";
import { FiturDua } from "./pages/FiturDua";
import Berita from "./pages/berita/Berita";
import Login from "./pages/login/Login"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/fitur/tiketVaksin" element={<AturTiketVaksin />} />
          <Route path="/fitur/sesiTersedia" element={<SesiTersedia />} />
          <Route path="/fitur/kelolaPesananTiket" element={<KelolaPesananTiket />} />
          <Route path="/fitur/aturVaksin" element={<AturVaksin />} />
          <Route path="/berita/:title" element={<Berita />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="*" element={<> 404 Not Found</>} />
        </Routes>
    </Router>
  );
}

export default App;
