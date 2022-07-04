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
import { useNavigate } from "react-router-dom";
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
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

export const AturVaksin = () => {
  const API_URL = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log("datax ", data);
  }, [data]);

  const [error, setError] = useState("");
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);

  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    // const url = "https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine";
    const url = API_URL+`/vaksin/user/14`;
    // const url = "https://vaccine-api-strapi.herokuapp.com/api/vaccines";
    try {
      const res = await axios.get(url);
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
  };

  const [responseStatus, setResponseStatus] = useState();

  const handleSubmit = (e) => {
    const vaksinData = {
      id_health: 14,
      nama: dataVaksin.namaVaksin,
      quantity: dataVaksin.stokVaksin,
    };
    axios
      .post(API_URL+"/vaksin", vaksinData)
      .then((response) => {
        // console.log(response.status);
        console.log(response.data.token);

        if (response.status === 200) {
          toast.success("Data BERHASIL ditambahkan");
        } else {
          toast.error("Data GAGAL ditambahkan");
        }
      });

      setTimeout(() => {
          window.location.reload(false);
      }, 1400);
  };

  const [dataDelete, setDataDelete] = useState([]);
  const handleSelectDelete = (id) => {
    // console.log("cek id delete", id);
    //GETDATA By ID
    axios
      // .get(`https://booking-vaksin-alta.herokuapp.com/api/vaksin/${id}`)
      .get(API_URL+`/vaksin/${id}`)
      .then((res) => {
        setDataDelete(res.data);
        // console.log("data deleteeee", res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Data gak ketemu");
        setError("Data gak ketemu");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(API_URL+`/vaksin/${id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Data BERHASIL dihapus");
        } else {
          toast.error("Data GAGAL dihapus");
        }
      });
      setTimeout(() => {
        window.location.reload(false);
    }, 1400);
  };

  const [dataEdit, setDataEdit] = useState([]);

  const handleSelectEdit = (id) => {
    console.log("cek id edit", id);
    //GETDATA By ID
    axios
      .get(API_URL+`/vaksin/${id}`)
      .then((res) => {
        setDataEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Data gak ketemu");
        setError("Data gak ketemu");
      });
  };

  const handleChangeUpdate = (e) => {
    const value = e.target.value;
    setDataEdit({
      ...dataEdit,
      [e.target.name]: value,
    });
  };

  const handleSubmitEdit = (id) => {
    const vaksinDataEdit = {
      id_health: 14,
      nama: dataEdit.nama,
      quantity: dataEdit.quantity,
    };
    axios
      .put(
        API_URL+`/vaksin/${id}`,
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
      setTimeout(() => {
        window.location.reload(false);
    }, 1400);
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
                            ID
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
                            class="text-sm font-medium text-white px-6 py-4 text-left"
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
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex flex-row gap-5">
                                  <TbEdit
                                    style={{
                                      cursor: "pointer"
                                    }}
                                    size="25px"
                                    color="rgba(135, 187, 134, 1)"
                                    onClick={() => {
                                      setShowModalEditVaksin(true);
                                      handleSelectEdit(vaksin.idVaksin)
                                    }}
                                  />
                                  <MdDelete
                                    style={{
                                      cursor: "pointer"
                                    }}
                                    size="25px"
                                    color="rgba(218, 125, 125, 1)"
                                    onClick={() => {
                                      setShowModalDeleteVaksin(true);
                                      handleSelectDelete(vaksin.idVaksin)
                                    }}
                                  />
                                </div>
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
