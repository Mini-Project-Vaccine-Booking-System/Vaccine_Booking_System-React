import axios from "axios";
import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoCalendarClearOutline, IoTimeOutline } from "react-icons/io5";
import { TbVaccineBottle, TbVaccine } from "react-icons/tb"
import { Button } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const KonfirmasiDataTiket = (props) => {
  console.log("cek props di konfirmasi data tiket", props)
  
  let day = props.waktuAwal
  day = day.substring(10, 8);
  console.log(day)

  let month = props.waktuAwal
  month = month.substring(7, 5);
  console.log(month)

  let year = props.waktuAwal
  year = year.substring(4, 0);
  console.log(year)

  let timeStart = props.waktuAwal
  timeStart = timeStart.substring(16, 11);
  console.log(timeStart)
  
  let timeEnd = props.waktuAkhir
  timeEnd = timeEnd.substring(16, 11);
  console.log(timeEnd)

  const handleSubmit = (e) => {
    // e.preventDefault();
    const sesiData = {
      waktu_awal: props.waktuAwal,
      waktu_akhir: props.waktuAkhir,
      vaksin1: props.vaksin1.vaksin1,
      stokVaksin1: props.vaksin1.stokVaksin1,
      vaksin2: props.vaksin2.vaksin2,
      stokVaksin2: props.vaksin2.stokVaksin2,
    };
    axios
      .post("https://62a33b8121232ff9b21be1dd.mockapi.io/session", sesiData)
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);

        if (response.status === 201) {
          toast.success("Data BERHASIL ditambahkan");
        } else {
          toast.error("Data GAGAL ditambahkan");
        }
      });
    // setRefresh()
    // setData((prevData) => [
    //   ...prevData,
    //   {
    //     id: "26",
    //     nama_vaksin: "nama_vaksin 5",
    //     stok: "744",
    //   },
    // ]);
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="w-11/12 mx-auto">
        <h1 className="text-20 font-600 mb-36">Konfirmasi Data Tiket</h1>
        <div className="mb-14">
          <h5 className="text-15 font-600 text-grey-700 text-left">Sesi Vaksin</h5>
          <div className="mt-10">
            <h6 className="text-left text-11">Tanggal Sesi</h6>
            <div className="border-1 rounded-6 flex flex-row p-5">
              <IoCalendarClearOutline 
                size="30px"
                style={{color: "rgba(102, 167, 255, 1)"}}/>
              <p className="text-left text-11 mt-2 ml-20">{day} - {month} - {year}</p>
            </div>
          </div>
          <div className="mt-14">
            <h6 className="text-left text-11">Waktu Sesi</h6>
            <div className="border-1 rounded-6 flex flex-row p-5">
              <IoTimeOutline 
                size="30px"
                style={{color: "rgba(102, 167, 255, 1)"}}/>
              <p className="text-left text-11 mt-2 ml-20">{timeStart} - {timeEnd}</p>
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-15 font-600 text-grey-700 text-left">Jenis Vaksin dan Stok</h5>
          <div className="flex flex-row mt-10">
            <div className="border-1 rounded-6 w-3/4 flex flex-row p-5">
              <TbVaccineBottle 
                size="30px"
                style={{color: "rgba(102, 167, 255, 1)"}}/>
              <p className="text-left text-11 mt-2 ml-20 mr-32">{props.vaksin1.vaksin1}</p>
            </div>
            <div className="border-1 rounded-6 flex flex-row p-5 ml-10">
              <p className="text-11 mt-2 mx-10">{props.vaksin1.stokVaksin1}</p>
            </div>
          </div>
          <div className="flex flex-row mt-10">
            <div className="border-1 rounded-6 w-3/4 flex flex-row p-5">
              <TbVaccineBottle 
                size="30px"
                style={{color: "rgba(102, 167, 255, 1)"}}/>
              <p className="text-left text-11 mt-2 ml-20 mr-32">{props.vaksin2.vaksin2}</p>
            </div>
            <div className="border-1 rounded-6 flex flex-row p-5 ml-10">
              <p className="text-11 mt-2 mx-10">{props.vaksin2.stokVaksin2}</p>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-end">
          <Button
              style={{
                backgroundColor: "rgba(2, 109, 225, 1)",
                padding: "10px 20px",
                fontSize: "14px",
                fontFamily: "Inter",
                borderRadius: "6px",
              }}
              variant="contained"
              // startIcon={<AddIcon />}
              onClick={handleSubmit}
            >
              Konfirm
          </Button>
        </div>
      </div>
    </div>
  );
};
