import React from "react";
import TextField from "@mui/material/TextField";
import { useState, createContext, useContext } from "react";

import { KonfirmasiDataTiket } from "./KonfirmasiDataTiket";
import { AturTiketVaksin } from "./AturTiketVaksin";

const VaksinContext = createContext();

export const TanggalVaksin = (props) => {
  console.log("cek props di tanggal vaksin", props)

  // const [waktuAwal, setWaktuAwal] = useState("");
  // const [waktuAkhir, setWaktuAkhir] = useState("");

  // const handleChangeWaktuAwal = (e) => {
  //   // console.log("di etarget", e.target.value)
  //   setWaktuAwal(e.target.value);
  // };

  // const handleChangeWaktuAkhir = (e) => {
  //   // console.log("di etarget", e.target.value)
  //   setWaktuAkhir(e.target.value);
  // };

  // console.log("waktu awal", waktuAwal);
  // console.log("waktu akhir", waktuAkhir);

  return (
    <VaksinContext.Provider>
      <div className="aturTanggalVaksin">
        <h1 className="text-20 font-600 mb-36">Atur Tanggal Vaksin</h1>
        <div className="p-5">
          <TextField
            fullWidth
            id="date"
            label="Masukan Waktu Awal"
            type="datetime-local"
            defaultValue="2022-05-06T00:00"
            // value={tanggalAwal}
            // sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={props.handleChangeWaktuAwal}
          />
        </div>
        <div className="p-5">
          <TextField
            fullWidth
            id="date"
            label="Masukan Waktu Akhir"
            type="datetime-local"
            defaultValue="2022-05-06T00:00"
            // value={tanggalAkhir}
            // sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={props.handleChangeWaktuAkhir}
          />
        </div>
      </div>
    </VaksinContext.Provider>
  );
};
