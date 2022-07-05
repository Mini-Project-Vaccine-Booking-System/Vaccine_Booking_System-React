import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoCalendarClearOutline, IoTimeOutline } from "react-icons/io5";
import { TbVaccineBottle, TbVaccine } from "react-icons/tb";
import { Button } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AturTiketVaksin } from "./AturTiketVaksin";

// export const UserContext = createContext();

export const KonfirmasiDataTiket = (props) => {
  // console.log("cek props di konfirmasi data tiket", props)

  // console.log("cek waktu milidetik", props.waktuAwal+":00")

  // let day = props.waktuAwal
  // day = day.substring(10, 8);
  // console.log(day)

  // let month = props.waktuAwal
  // month = month.substring(7, 5);
  // console.log(month)

  // let year = props.waktuAwal
  // year = year.substring(4, 0);
  // console.log(year)

  // let timeStart = props.waktuAwal
  // timeStart = timeStart.substring(16, 11);
  // console.log(timeStart)

  // let timeEnd = props.waktuAkhir
  // timeEnd = timeEnd.substring(16, 11);
  // console.log(timeEnd)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // e.preventDefault();
    const sesiData = {
      id_health: 14,
      date: props.tanggal,
      start: props.waktuAwal + ":00",
      end: props.waktuAkhir + ":00",
      nama: props.vaksin1.vaksin1,
      stok: props.vaksin1.stokVaksin1,
      // stok_vaksin1: props.vaksin1.stokVaksin1,
    };
    axios
      .post("https://booking-vaksin-alta.herokuapp.com/api/session")
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);

        if (response.status === 200) {
          toast.success("Data BERHASIL ditambahkan");
        } else {
          toast.error("Data GAGAL ditambahkan");
        }
      });

    setTimeout(() => {
      navigate("/fitur/sesiTersedia");
    }, 1800);
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

  const kirim = <AturTiketVaksin send={handleSubmit} />;
  console.log(kirim, "kirimm")

  // const data = {all:{
  //   id_health: 14,
  //   date: props.tanggal,
  //   start: props.waktuAwal + ":00",
  //   end: props.waktuAkhir + ":00",
  //   nama: props.vaksin1.vaksin1,
  //   stok: props.vaksin1.stokVaksin1,
  // }}
  // const newContext = useContext({
  //   kirim: () => handleSubmit,
  // });
  // const newContext = {kirim:handleSubmit}

  return (
    // <UserContext.Provider >
      <div className="">
        <ToastContainer />
        <div className="w-11/12 mx-auto">
          <h1 className="text-20 font-600 mb-36">Konfirmasi Data Tiket</h1>
          <div className="mb-14">
            <h5 className="text-15 font-600 text-grey-700 text-left">
              Sesi Vaksin
            </h5>
            <div className="mt-10">
              <h6 className="text-left text-11">Tanggal Sesi</h6>
              <div className="border-1 rounded-6 flex flex-row p-5">
                <IoCalendarClearOutline
                  size="30px"
                  style={{ color: "rgba(102, 167, 255, 1)" }}
                />
                <p className="text-left text-11 mt-2 ml-20">{props.tanggal}</p>
              </div>
            </div>
            <div className="mt-14">
              <h6 className="text-left text-11">Waktu Sesi</h6>
              <div className="border-1 rounded-6 flex flex-row p-5">
                <IoTimeOutline
                  size="30px"
                  style={{ color: "rgba(102, 167, 255, 1)" }}
                />
                <p className="text-left text-11 mt-2 ml-20">
                  {props.waktuAwal} - {props.waktuAkhir}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-15 font-600 text-grey-700 text-left">
              Jenis Vaksin dan Stok
            </h5>
            <div className="flex flex-row mt-10">
              <div className="border-1 rounded-6 w-3/4 flex flex-row p-5">
                <TbVaccineBottle
                  size="30px"
                  style={{ color: "rgba(102, 167, 255, 1)" }}
                />
                <p className="text-left text-11 mt-2 ml-20 mr-32">
                  {props.vaksin1.vaksin1}
                </p>
              </div>
              <div className="border-1 rounded-6 flex flex-row p-5 ml-10">
                <p className="text-11 mt-2 mx-10">
                  {props.vaksin1.stokVaksin1}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="mt-20 flex justify-end">
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
          </div> */}
        </div>
      </div>
    // </UserContext.Provider>
  );
};
