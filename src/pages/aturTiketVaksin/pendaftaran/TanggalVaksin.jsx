import React from "react";
import TextField from "@mui/material/TextField";
import { useState, createContext, useContext } from "react";

import { KonfirmasiDataTiket } from "./KonfirmasiDataTiket";
import { AturTiketVaksin } from "./AturTiketVaksin";

const VaksinContext = createContext();

export const TanggalVaksin = (props) => {
  // console.log("cek props di tanggal vaksin", props)

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

  const defaultDay = new Date().getDate()
  const defaultMonth = new Date().getMonth()
  const defaultYear = new Date().getFullYear()
  const defaultTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  // const defaultValue = defaultYear + "-" + ('0' + defaultMonth).slice(-2) + "-" + ('0' + defaultDay).slice(-2) + "T" + defaultTime
  const defaultValue = defaultYear + "-" + ('0' + defaultMonth).slice(-2) + "-" + ('0' + defaultDay).slice(-2)
  // console.log("cek tanggal", defaultDate)
  // console.log("cek Hari", defaultDay)
  console.log("cek bulan", defaultMonth)
  // console.log("cek tahun", defaultYear)
  // console.log("cek waktu", defaultTime)
  console.log("cek all", defaultValue)

  return (
    <VaksinContext.Provider>
      <div className="aturTanggalVaksin">
        <h1 className="text-20 font-600 mb-36">Atur Tanggal Vaksin</h1>
        <div className="p-5">
          <TextField
            fullWidth
            id="date"
            label="Masukan Tanggal"
            type="date"
            defaultValue={defaultValue}
            // value={tanggalAwal}
            // sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={props.handleChangeTanggal}
          />
        </div>
        <div className="flex flex-row">
          <div className="p-5 w-1/2">
            <TextField
              fullWidth
              id="date"
              label="Masukan Waktu Awal"
              type="time"
              defaultValue="00:00"
              // value={tanggalAwal}
              // sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={props.handleChangeWaktuAwal}
            />
          </div>
          <div className="p-5 w-1/2">
            <TextField
              fullWidth
              id="date"
              label="Masukan Waktu Akhir"
              type="time"
              defaultValue="00:00"
              // value={tanggalAkhir}
              // sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={props.handleChangeWaktuAkhir}
            />
          </div>
        </div>
      </div>
    </VaksinContext.Provider>
  );
};
