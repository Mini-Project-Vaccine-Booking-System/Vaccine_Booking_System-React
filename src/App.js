import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
// import NavBarList from "./config/NavbarList";
import { AturTiketVaksin } from "./Pages/KelolaSesiVaksinansi/AturTiketVaksin";
import { KelolaPesananTiket } from "./Pages/KelolaPesananTiket/KelolaPesananTiket";
import { AturVaksin } from "./Pages/KelolaVaksin/aturVaksin";
import { SesiTersedia } from "./Pages/SesiTersedia/SesiTersedia";
import Berita from "./Pages/Berita/DetailBerita";
import AllBerita from "./Pages/Berita/AllBerita";
import Login from "./Pages/Login/Login"
import { Profile } from "./Pages/Profile/profile";
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
