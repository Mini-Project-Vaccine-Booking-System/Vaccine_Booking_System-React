import React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Container, Typography } from "@mui/material";

export const TiketVaksinBerhasil = () => {
  return (
    <div className="h-105">
      <CheckCircleOutlineIcon color="success" fontSize="large"/>
      <Typography variant="h4">Tiket Vaksin Berhasil Di Terbitkan</Typography>
      <Typography variant="subtitle2">Terima kasih telat turut mengsuksesskan Indonesia sehat bebas</Typography>
      <Typography variant="subtitle2">Covid-19 Semanagat!, Tetap Jaga 5M ya..</Typography>
      <div>
        <Button>Buat Tiket Baru</Button>
      </div>
    </div>
  )
}
