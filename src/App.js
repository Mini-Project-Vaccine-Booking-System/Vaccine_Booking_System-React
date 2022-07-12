import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import NavBarList from "./config/NavbarList";
import { AturTiketVaksin } from "./pages/aturTiketVaksin/pendaftaran/AturTiketVaksin";
import { KelolaPesananTiket } from "./pages/kelolaPesananTiket/KelolaPesananTiket";
import { AturVaksin } from "./pages/aturVaksin/aturVaksin";
import { SesiTersedia } from "./pages/aturTiketVaksin/sesiTersedia/SesiTersedia";
import Berita from "./pages/berita/Berita";
import AllBerita from "./pages/berita/AllBerita";
import Login from "./pages/login/Login"
import { Profile } from "./pages/profile/profile";
import { PrivateRoute } from "./PrivateRoute";


function App() {

  return (
       <Router> 
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route exact path="/" element={<PrivateRoute/>}>
                <Route path="/" element={<Home />} />
                <Route path="/fitur/tiketVaksin" element={<AturTiketVaksin />} />
                <Route path="/fitur/sesiTersedia" element={<SesiTersedia />} />
                <Route path="/fitur/kelolaPesananTiket" element={<KelolaPesananTiket />} />
                <Route path="/fitur/aturVaksin" element={<AturVaksin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/berita/:title" element={<Berita />} />
                <Route path="/berita/AllBerita" element={<AllBerita />} />
              </Route>
              <Route path="*" element={<> 404 Not Found</>} />
            </Routes>
       </Router> 
  );
}

export default App;
