import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"
import { TextField, FormControl } from '@mui/material';
export const KelolaPesananTiket = () => {

  const [showModal, setShowModal] = React.useState(false);
  const [showModalEditVaksin, setShowModalEditVaksin] = React.useState(false);
  const [showModalDeleteVaksin, setShowModalDeleteVaksin] = React.useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
    useEffect(() => {

        axios.get("https://62a33b8121232ff9b21be1dd.mockapi.io/bookings").then((res) => {
          setData(res.data)
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log("Data gak ketemu")
          setError("Data gak ketemu")
        })
   }, []);

   const handleDelete = (id) => {
    axios.delete(`https://62a33b8121232ff9b21be1dd.mockapi.io/bookings/${id}`).then((response) => {
        console.log(response.status);
        console.log(response.data.token);
      });
    }

    const [dataEdit, setDataEdit] = useState([]);
    const [errorEdit, setErrorEdit] = useState("");

    // const [namaVaksin, setNamaVaksin] = ("");
    // const [stokVaksin, setStokVaksin] = ("");

    const handleSelectEdit = (id) => {
        console.log("cek id edit", id)
        //GETDATA By ID
        axios.get(`https://62a33b8121232ff9b21be1dd.mockapi.io/bookings/${id}`).then((res) => {
            setDataEdit(res.data)
        })
        .catch((err) => {
            console.log(err);
            console.log("Data gak ketemu")
            setError("Data gak ketemu")
        })
        // setNamaVaksin(dataEdit.nama_vaksin)
        // setStokVaksin(dataEdit.stok)
    }
    console.log("cek data edit", dataEdit);
    // console.log("cek data namaavaksin", namaVaksin);

    const handleChangeUpdate = (e) => {
        const value = e.target.value;
        setDataEdit({
          ...dataEdit,
          [e.target.name]: value
        });
        // setNamaVaksin(dataEdit.namaVaksin)
        // setStokVaksin(dataEdit.stokVaksin)
        console.log("cek value", value)
        // console.log("cek dataEditNew", dataEdit.namaVaksin)
    };
    

    const handleSubmitEdit = (id) => {
        // e.preventDefault();
        console.log("cek data edit di handlesubmit", dataEdit)
        const vaksinDataEdit = {
          booking_id: dataEdit.booking_id,
          nik: dataEdit.nik,
          nama: dataEdit.nama,
          waktu_awal: dataEdit.waktu_awal,
          waktu_akhir: dataEdit.waktu_akhir
        };
        axios.put(`https://62a33b8121232ff9b21be1dd.mockapi.io/bookings/${id}`, vaksinDataEdit).then((response) => {
          console.log(response.status);
          console.log(response.data.token);
        });
    };

  return (
    <div>
      <h1 className='text-3xl font-medium'>Booking Ticket</h1>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      No
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Booking ID
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      NIK
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Name
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Waktu Awal
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Waktu Akhir
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((bookings) => (
                    <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bookings.id}</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {bookings.booking_id}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {bookings.nik}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {bookings.nama}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {bookings.waktu_awal}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {bookings.waktu_akhir}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button className='mr-10' 
                          onClick={() => {
                            setShowModalEditVaksin(true);
                            handleSelectEdit(bookings.id)
                            }}>Edit</button>
                        <button onClick={() => handleDelete(bookings.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      
      {showModalEditVaksin ? (
        // MODAL EDIT VAKSIN
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                    Edit Data Booking
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEditVaksin(false)}
                >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-col">
                    <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                            disabled="true"
                            labelId="booking_id"
                            id="booking_id"
                            // label="Booking ID"
                            name='booking_id'
                            value={dataEdit.booking_id}
                            type="text"
                            onChange={handleChangeUpdate}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                            labelId="nik"
                            id="nik"
                            // label="NIK"
                            name='nik'
                            value={dataEdit.nik}
                            type="number"
                            onChange={handleChangeUpdate}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                            labelId="nama"
                            id="nama"
                            // label="Nama"
                            name='nama'
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
                            name='waktu_awal'
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
                            name='waktu_akhir'
                            type="number"
                            value={dataEdit.waktu_akhir}
                            onChange={handleChangeUpdate}
                        />
                    </FormControl>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalEditVaksin(false)}
                >
                    Tutup
                </button>
                <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        setShowModalEditVaksin(false);
                        handleSubmitEdit(dataEdit.id)
                    }}
                >
                    Edit Booking
                </button>
                </div>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        //AKHIR MODAL EDIT VAKSIN
        ) : null}


      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}
