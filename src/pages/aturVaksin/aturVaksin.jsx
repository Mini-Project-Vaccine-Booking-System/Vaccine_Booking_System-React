import React from "react";
import "./aturVaksinStyle.css";
import {
  TextField,
  FormControl,
  InputLabel,
  LinearProgress,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { useReducer } from "react";
import NavBarList from "../../config/NavbarList";

export const AturVaksin = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("datax ", data);
  }, [data]);

  const [error, setError] = useState("");
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);
  //   useEffect(() => {
  //       //GETDATA
  //       console.log("fetching data")
  //       axios.get("https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine").then((res) => {
  //           setData(res.data)
  //           console.log(res.data);
  //       })
  //       .catch((err) => {
  //           console.log(err);
  //           console.log("Data gak ketemu")
  //           setError("Data gak ketemu")
  //       })

  //  }, []);

  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const url = "https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine";
    // const url = "https://booking-vaksin-alta.herokuapp.com/api/vaksin";
    try {
      const res = await axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json",
        },
      });
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
  }, [refresh]);

  const [showModalTambahVaksin, setShowModalTambahVaksin] =
    React.useState(false);
  const [showModalEditVaksin, setShowModalEditVaksin] = React.useState(false);
  const [showModalDeleteVaksin, setShowModalDeleteVaksin] =
    React.useState(false);

  const [dataVaksin, setDataVaksin] = useState({
    namaVaksin: "",
    stokVaksin: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setDataVaksin({
      ...dataVaksin,
      [e.target.name]: value,
    });
    // console.log("cek value", value)
  };
  // console.log("cek dataVaksin", dataVaksin)

  const [responseStatus, setResponseStatus] = useState();

  const handleSubmit = (e) => {
    // e.preventDefault();
    const vaksinData = {
      nama: dataVaksin.namaVaksin,
      quantity: dataVaksin.stokVaksin,
    };
    axios
      .post("https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine", vaksinData)
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

  const [dataDelete, setDataDelete] = useState([]);
  const handleSelectDelete = (id) => {
    console.log("cek id delete", id);
    //GETDATA By ID
    axios
      // .get(`https://booking-vaksin-alta.herokuapp.com/api/vaksin/${id}`)
      .get(`https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine/${id}`)
      .then((res) => {
        setDataDelete(res.data);
        console.log("data deleteeee", res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Data gak ketemu");
        setError("Data gak ketemu");
      });
    console.log("data delete di state", dataDelete);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine/${id}`)
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

  // const [namaVaksin, setNamaVaksin] = ("");
  // const [stokVaksin, setStokVaksin] = ("");

  const handleSelectEdit = (id) => {
    console.log("cek id edit", id);
    //GETDATA By ID
    axios
      // .get(`https://booking-vaksin-alta.herokuapp.com/api/vaksin/${id}`)
      .get(`https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine/${id}`)
      .then((res) => {
        setDataEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Data gak ketemu");
        setError("Data gak ketemu");
      });
    // setNamaVaksin(dataEdit.nama_vaksin)
    // setStokVaksin(dataEdit.stok)
  };
  console.log("cek data edit", dataEdit);
  // console.log("cek data namaavaksin", namaVaksin);

  const handleChangeUpdate = (e) => {
    const value = e.target.value;
    setDataEdit({
      ...dataEdit,
      [e.target.name]: value,
    });
    // setNamaVaksin(dataEdit.namaVaksin)
    // setStokVaksin(dataEdit.stokVaksin)
    console.log("cek value", value);
    console.log("cek dataEditNew", dataEdit.namaVaksin);
  };

  const handleSubmitEdit = (id) => {
    // e.preventDefault();
    console.log("cek data edit di handlesubmit", dataEdit);
    const vaksinDataEdit = {
      nama: dataEdit.nama,
      quantity: dataEdit.quantity,
      idVaksin: dataEdit.idVaksin,
    };
    axios
      .put(
        `https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine/${id}`,
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
      <div>
        <ToastContainer />
        <div className="aturVaksin p-10 ">
          <p className="navigasi">
            Menu &#62;{" "}
            <span className="font-semibold underline">Atur Vaksin</span>
          </p>
          <h1 className="text-3xl mb-5">Atur Vaksin</h1>

          <div className="w-full flex justify-end">
            {/* <button type="button" class=" inline-block px-10 py-7 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => setShowModalTambahVaksin(true)}
              >Tambah Jenis Vaksin</button> */}
            <Button
              style={{
                backgroundColor: "rgba(2, 109, 225, 1)",
                padding: "10px 20px",
                fontSize: "18px",
                fontFamily: "Inter",
                borderRadius: "10px",
              }}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowModalTambahVaksin(true)}
            >
              Tambah Jenis Vaksin
            </Button>
          </div>
          {loading ? (
            <div className=" flex justify-center items-center mt-10">
              <CircularProgress />
            </div>
          ) : (
            <div class="flex flex-col">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-16 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden bg-white p-10 shadow-lg rounded-8">
                    <table class="min-w-full">
                      <thead class="bg-blue-400">
                        <tr>
                          <th
                            scope="col"
                            class="text-sm font-medium text-white px-6 py-4 text-center"
                          >
                            No
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-white px-6 py-4 text-center"
                          >
                            Nama Vaksin
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-white px-6 py-4 text-center"
                          >
                            Jumlah Stok
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-white px-6 py-4 text-center"
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((vaksin) => (
                          <tr className="bg-white border-b rounded-6 transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                              {vaksin.idVaksin}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap pl-12">
                              {vaksin.nama}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                              {vaksin.quantity}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                              <IconButton
                                aria-label="edit"
                                size="large"
                                color="success"
                              >
                                <EditIcon
                                  fontSize="inherit"
                                  onClick={() => {
                                    setShowModalEditVaksin(true);
                                    handleSelectEdit(vaksin.idVaksin);
                                  }}
                                />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                size="large"
                                color="error"
                              >
                                <DeleteIcon
                                  fontSize="inherit"
                                  onClick={() => {
                                    setShowModalDeleteVaksin(true);
                                    handleSelectDelete(vaksin.idVaksin);
                                  }}
                                />
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="modalAturVaksin">
            {showModalTambahVaksin ? (
              // MODAL TAMBAH VAKSIN
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="my-10 mx-auto">Tambah Vaksin</h3>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="namaVaksin"
                            id="namaVaksin"
                            label="Nama Vaksin"
                            name="namaVaksin"
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
                            name="stokVaksin"
                            type="number"
                            onChange={handleChange}
                            // value={tanggalAwal}
                          />
                        </FormControl>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-500 text-sm px-6 py-2 outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModalTambahVaksin(false)}
                        >
                          Tutup
                        </button>
                        <button
                          className="bg-blue-600 text-white font-500 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModalTambahVaksin(false);
                            handleSubmit();
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
            ) : //AKHIR MODAL TAMBAH VAKSIN
            null}

            {showModalEditVaksin ? (
              // MODAL EDIT VAKSIN
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="my-10 mx-auto">Edit Vaksin</h3>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="nama_vaksin"
                            id="nama_vaksin"
                            // label="Nama Vaksin"
                            name="nama"
                            type="text"
                            value={dataEdit.nama}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 200 }}>
                          {/* <InputLabel id="stok">adasdas</InputLabel> */}
                          <TextField
                            labelId="stok"
                            id="stok"
                            // label="Stok"
                            name="quantity"
                            type="number"
                            value={dataEdit.quantity}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent px-6 py-2 text-sm outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModalEditVaksin(false)}
                        >
                          Tutup
                        </button>
                        <button
                          className="bg-blue-600 text-white text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModalEditVaksin(false);
                            handleSubmitEdit(dataEdit.idVaksin);
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
                          Apakah anda yakin ingin menghapus vaksin{" "}
                          <span className="font-bold underline decoration-blue-800">
                            {dataDelete.nama}
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
                            handleDelete(dataDelete.idVaksin);
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
      </div>
    </NavBarList>
  );
};
