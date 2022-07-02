import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./kelolaPesananTiket.css";
import NavBarList from "../../config/NavbarList";

import { TbEdit } from "react-icons/tb";
import { AiOutlineRight } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delete from "@mui/icons-material/Delete";

export const KelolaPesananTiket = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModalEditVaksin, setShowModalEditVaksin] = React.useState(false);
  const [showModalDeleteVaksin, setShowModalDeleteVaksin] =
    React.useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    setLoading(true);

    // const url = `https://62a33b8121232ff9b21be1dd.mockapi.io/bookings`;
    const url = `https://booking-vaksin-alta.herokuapp.com/api/booking/user/14`;
    try {
      const res = await axios.get(url, {});
      console.log(res.data);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [dataDelete, setDataDelete] = useState([]);

  // const handleSelectDelete = (id) => {
  //   console.log("cek id delete", id);
  //   //GETDATA By ID
  //   axios
  //     .get(`https://62a33b8121232ff9b21be1dd.mockapi.io/bookings/${id}`)
  //     .then((res) => {
  //       setDataDelete(res.data);
  //       console.log("data deleteeee", res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Data gak ketemu");
  //       setError("Data gak ketemu");
  //     });
  //   console.log("data delete di state", dataDelete);
  // };

  const handleDelete = (id) => {
    axios
      .delete(`https://booking-vaksin-alta.herokuapp.com/api/booking/${id}`)
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);

        if (response.status === 200) {
          toast.success("Data BERHASIL dihapus");
        } else {
          toast.error("Data GAGAL dihapus");
        }
      });
  };

  const [dataEdit, setDataEdit] = useState([]);
  const [errorEdit, setErrorEdit] = useState("");


  const handleSelectEdit = (id) => {
    console.log("cek id edit", id);
    //GETDATA By ID
    axios
      .get(`https://booking-vaksin-alta.herokuapp.com/api/booking/${id}`)
      .then((res) => {
        setDataEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Data gak ketemu");
        setError("Data gak ketemu");
      });
  };
  // console.log("cek data edit", dataEdit);
  // console.log("cek data namaavaksin", namaVaksin);

  const handleChangeUpdate = (e) => {
    const value = e.target.value;
    setDataEdit({
      ...dataEdit,
      [e.target.name]: value,
    });
    console.log("cek value", value);
  };

  const handleSubmitEdit = (id) => {
    console.log("cek data edit di handlesubmit", dataEdit);
    const vaksinDataEdit = {
      booking_id: dataEdit.booking_id,
      nik: dataEdit.nik,
      nama: dataEdit.nama,
      waktu_awal: dataEdit.waktu_awal,
      waktu_akhir: dataEdit.waktu_akhir,
    };
    axios
      .put(
        `https://booking-vaksin-alta.herokuapp.com/api/booking/${id}`,
        vaksinDataEdit
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);

        if (response.status === 200) {
          toast.success("Data BERHASIL diubah");
        } else {
          toast.error("Data GAGAL diubah");
        }
      });
  };

  return (
    <NavBarList>
      <div className="kelolaPesananTiket m-10">
        <ToastContainer />
        <p className="navigasi">
          Menu &#62;{" "}
          <span className="font-semibold underline">Kelola Pesanan</span>
        </p>
        <h1 className="text-3xl font-medium">Kelola Pesanan</h1>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-16 inline-block min-w-full sm:px-6 lg:px-8">
              {loading ? (
                <div className="flex justify-center item-center">
                  {/* <h1>Loading...</h1> */}
                  <CircularProgress />
                </div>
              ) : (
                <div class="overflow-hidden bg-white p-10 shadow-lg rounded-8">
                  <table class="min-w-full">
                    <thead class="bg-blue-400">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Booking ID
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          NIK
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Waktu Awal
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Waktu Akhir
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-white px-6 py-4 text-left"
                        >
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((bookings) => (
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {bookings.idBooking}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {bookings.kelompok.nik}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {bookings.kelompok.namaKelompok}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {bookings.session.date}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {bookings.session.start}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {bookings.session.end}
                          </td>
                          <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {/* <IconButton
                              aria-label="delete"
                              size="large"
                              color="error"
                            >
                              <DeleteIcon
                                onClick={() => {
                                  setShowModalEditVaksin(false);
                                  setShowModalDeleteVaksin(true);
                                }}
                              />
                            </IconButton> */}
                            <AiOutlineRight 
                              style={{
                                cursor: "pointer"
                              }}
                              color="rgba(135, 187, 134, 1)"
                              onClick={() => {
                                setShowModalEditVaksin(true);
                                handleSelectEdit(bookings.idBooking);
                              }}/>
                              
                            {/* <IconButton
                              aria-label="edit"
                              size="large"
                              color="success"
                            >
                              <EditIcon
                                fontSize="inherit"
                                onClick={() => {
                                  setShowModalEditVaksin(true);
                                  handleSelectEdit(bookings.idBooking);
                                }}
                              />
                            </IconButton> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modalKelolaPesananTiket">
          {showModalEditVaksin ? (
            // MODAL EDIT VAKSIN
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold my-10 mx-auto">
                        Edit Data Booking
                      </h3>
                    </div>
                    <div className="px-12 mt-5 border-b border-solid border-slate-200 pb-5">
                      <p>ID Booking : {dataEdit.idBooking}</p>
                      <p className="text-12">NIK : {dataEdit.kelompok?.nik}</p>
                      <p>Nama : {dataEdit.kelompok?.namaKelompok}</p>
                      <p>Tanggal : {dataEdit.session?.date}</p>
                      <p>Waktu : {dataEdit.session?.start} - {dataEdit.session?.end}</p>
                      <p>Vaksin : {dataEdit.session?.vaksin.nama}</p>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex flex-col">
                      <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                          disabled="true"
                          labelId="nik"
                          id="nik"
                          // label="Booking ID"
                          name="nik"
                          value={dataEdit.kelompok?.nik}
                          type="number"
                          onChange={handleChangeUpdate}
                        />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                          labelId="nama"
                          id="nama"
                          // label="nama"
                          name="nama"
                          value={dataEdit.kelompok?.namaKelompok}
                          type="text"
                          onChange={handleChangeUpdate}
                        />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                          labelId="nama"
                          id="nama"
                          // label="Nama"
                          name="nama"
                          type="text"
                          value={dataEdit.nama}
                          onChange={handleChangeUpdate}
                        />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                          labelId="waktu_awal"
                          id="waktu_awal"
                          // label="Waktu Awal"
                          name="waktu_awal"
                          type="number"
                          value={dataEdit.waktu_awal}
                          onChange={handleChangeUpdate}
                        />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                          labelId="waktu_akhir"
                          id="waktu_akhir"
                          // label="Waktu Akhir"
                          name="waktu_akhir"
                          type="number"
                          value={dataEdit.waktu_akhir}
                          onChange={handleChangeUpdate}
                        />
                      </FormControl>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-blue-600 px-6 py-2 text-sm outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalEditVaksin(false)}
                      >
                        Tutup
                      </button>
                      <button
                        className="bg-blue-600 text-white text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowModalEditVaksin(false);
                          handleSubmitEdit(dataEdit.idBooking);
                        }}
                      >
                        Edit Booking
                      </button>
                      <button
                        className="bg-red-600 text-white text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => {
                          setShowModalEditVaksin(false);
                          setShowModalDeleteVaksin(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : //AKHIR MODAL EDIT VAKSIN
          null}

          {showModalDeleteVaksin ? (
            // MODAL DELETE VAKSIN
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="my-10 mx-auto">Delete Vaksin</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-12 flex-auto">
                      <p className="px-10">
                        Apakah anda yakin ingin menghapus booking id{" "}
                        <span className="font-bold underline decoration-blue-800">
                          {dataEdit.idBooking}
                        </span>
                        ?
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent px-6 py-2 text-sm outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowModalDeleteVaksin(false);
                          handleDelete(dataEdit.idBooking);
                        }}
                      >
                        Ya
                      </button>
                      <button
                        className="bg-blue-600 text-white text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalDeleteVaksin(false)}
                      >
                        Tidak
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : //AKHIR MODAL DELETE VAKSIN
          null}
        </div>
      </div>
    </NavBarList>
  );
};
