import React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Container, Typography } from "@mui/material";
import { SuccessSvg } from "./SuccessSvg";

export const TiketVaksinBerhasil = (props) => {

  const BuatTiketBaru = () => {
    setTimeout(() => {
      window.location.reload(false);
  }, 400);
  }

  return (
    <div className="">
      <SuccessSvg/>
        <p className="text-20 font-600">Tiket Vaksin Berhasil Di Terbitkan</p>
        <p>Terima kasih telat turut mengsukseskan Indonesia sehat bebas</p>
        <p>Covid-19 Semanagat!, Tetap Jaga 5M ya..</p>
        <div className="mt-32">
          <button className="bg-blue-600 px-80 pt-4 pb-5 text-white rounded-4 text-10 shadow-4" onClick={BuatTiketBaru}>Buat Tiket Baru</button>
        </div>
    </div>
  )
}
