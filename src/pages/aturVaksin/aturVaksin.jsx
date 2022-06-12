import React from 'react'
// import "./aturVaksinStyle.css"
import { TextField, FormControl, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios"


export const AturVaksin = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        //GETDATA
        console.log("fetching data")
        axios.get("https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine").then((res) => {
            setData(res.data)
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            console.log("Data gak ketemu")
            setError("Data gak ketemu")
        })

   }, []);

    const [showModalTambahVaksin, setShowModalTambahVaksin] = React.useState(false);
    const [showModalEditVaksin, setShowModalEditVaksin] = React.useState(false);
    const [showModalDeleteVaksin, setShowModalDeleteVaksin] = React.useState(false);

    const [dataVaksin, setDataVaksin] = useState({
        namaVaksin: "",
        stokVaksin: ""
    });
    
    const handleChange = (e) => {
        const value = e.target.value;
        setDataVaksin({
          ...dataVaksin,
          [e.target.name]: value
        });
        // console.log("cek value", value)
    };
    // console.log("cek dataVaksin", dataVaksin)

    const handleSubmit = (e) => {
        // e.preventDefault();
        const vaksinData = {
          nama_vaksin: dataVaksin.namaVaksin,
          stok: dataVaksin.stokVaksin
        };
        axios.post("https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine", vaksinData).then((response) => {
          console.log(response.status);
          console.log(response.data.token);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine/${id}`).then((response) => {
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
        axios.get(`https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine/${id}`).then((res) => {
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
        console.log("cek dataEditNew", dataEdit.namaVaksin)
    };
    

    const handleSubmitEdit = (id) => {
        // e.preventDefault();
        console.log("cek data edit di handlesubmit", dataEdit)
        const vaksinDataEdit = {
          nama_vaksin: dataEdit.nama_vaksin,
          stok: dataEdit.stok,
          id: dataEdit.id
        };
        axios.put(`https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine/${id}`, vaksinDataEdit).then((response) => {
          console.log(response.status);
          console.log(response.data.token);
        });
    };
    

  return (
    <div className="aturVaksin ml-5 mt-5 ">
        <h1 className='text-3xl mb-5'>Atur Vaksin</h1>
        {data.map((vaksin) => (
            <div>
                <div class="flex justify-center mb-6 cardVaksin">
                    <div class="block p-6 rounded-lg shadow-lg bg-white">
                        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{vaksin.nama_vaksin}</h5>
                        <p class="text-gray-700 text-base mb-4">
                        Stok : {vaksin.stok}
                        </p>
                        <button type="button" class=" inline-block px-6 py-2.5 ml-10 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => {
                            handleSelectEdit(vaksin.id);
                            setShowModalEditVaksin(true);
                            }}>Edit</button>
                        <button type="button" class=" inline-block px-6 py-2.5 ml-5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => handleDelete(vaksin.id)}>Delete</button>
                    </div>
                </div>
            </div>
            
            
        ))}

        <button type="button" class=" inline-block px-6 py-2.5 ml-5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => setShowModalTambahVaksin(true)}
        >Tambah Jenis Vaksin</button>

        {showModalTambahVaksin ? (
        // MODAL TAMBAH VAKSIN
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
                    Tambah Vaksin
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalTambahVaksin(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                            labelId="namaVaksin"
                            id="namaVaksin"
                            label="Nama Vaksin"
                            name='namaVaksin'
                            type="text"
                            onChange={handleChange}
                            // value={tanggalAwal}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 200 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                            labelId="stokVaksin"
                            id="stokVaksin"
                            label="Jumlah Stok"
                            name='stokVaksin'
                            type="number"
                            onChange={handleChange}
                            // value={tanggalAwal}
                        />
                    </FormControl>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalTambahVaksin(false)}
                  >
                    Tutup
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        setShowModalTambahVaksin(false);
                        handleSubmit()
                    }}
                  >
                    Tambah Vaksin
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        //AKHIR MODAL TAMBAH VAKSIN
        ) : null}


        
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
                    Edit Vaksin
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
                <div className="relative p-6 flex-auto">
                    <FormControl sx={{ m: 1, width: 400 }}>
                        {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                        <TextField
                            labelId="nama_vaksin"
                            id="nama_vaksin"
                            // label="Nama Vaksin"
                            name='nama_vaksin'
                            type="text"
                            value={dataEdit.nama_vaksin}
                            onChange={handleChangeUpdate}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 200 }}>
                        {/* <InputLabel id="stok">adasdas</InputLabel> */}
                        <TextField
                            labelId="stok"
                            id="stok"
                            // label="Stok"
                            name='stok'
                            type="number"
                            value={dataEdit.stok}
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
                    Edit Vaksin
                </button>
                </div>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        //AKHIR MODAL EDIT VAKSIN
        ) : null}
        
        

        {showModalDeleteVaksin ? (
        // MODAL DELETE VAKSIN
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
                    Delete Vaksin
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
                <div className="relative p-6 flex-auto">
                    <p>
                        Apakah anda yakin ingin menghapus vaksin?
                    </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalDeleteVaksin(false)}
                >
                    Ya
                </button>
                <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
        //AKHIR MODAL DELETE VAKSIN
        ) : null}
    </div>
  )
}
