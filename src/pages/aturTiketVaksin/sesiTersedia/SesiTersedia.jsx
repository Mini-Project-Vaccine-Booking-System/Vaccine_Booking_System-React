import { CircularProgress, FormControl, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarList from "../../../config/NavbarList";
import "./sesiTersedia.css";

export const SesiTersedia = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModalEditVaksin, setShowModalEditVaksin] = useState(false);
  const [showModalDeleteVaksin, setShowModalDeleteVaksin] = useState(false);
  const [dataDelete, setDataDelete] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  // const [dataVaksin, setDataVaksin] = useState({
  //   id: "",
  //   stok_vaksin1: "",
  //   stok_vaksin2: "",
  //   vaksin1: "",
  //   vaksin2: "",
  //   waktu_akhir: "",
  //   waktu_awal: "",
  // });

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setDataVaksin({
  //     ...dataVaksin,
  //     [e.target.name]: value,
  //   });
  // };

  const getData = async () => {
    setLoading(true);
    const url = "https://62a33b8121232ff9b21be1dd.mockapi.io/session";
    // const url = "https://booking-vaksin-alta.herokuapp.com/api/vaksin";
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

  // handleDelete

  const handleSelectDelete = (id) => {
    console.log("cek id delete", id);
    axios
      .get(`https://62a33b8121232ff9b21be1dd.mockapi.io/session/${id}`)
      .then((res) => {
        setDataDelete(res.data);
        console.log("data DtaaasesiTersedia", res.data);
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
      .delete(`https://62a33b8121232ff9b21be1dd.mockapi.io/session/${id}`)
      .then((response) => {
        console.log("datax berhasil di hapus",response.status);
        // console.log(response.data.token);

        if (response.status === 200) {
          toast.success("Data BERHASIL dihapus");
        } else {
          toast.error("Data GAGAL dihapus");
        }
      });
  };

  // endHandleDelete

  const handleSelectEdit = (id) => {
    console.log("cek id edit", id);
    //GETDATA By ID
    axios
      .get(`https://62a33b8121232ff9b21be1dd.mockapi.io/session/${id}`)
      .then((res) => {
        setDataEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Data gak ketemu");
        setError("Data gak ketemu");
      });
  };
  console.log("cek data edit", dataEdit);

  const handleChangeUpdate = (e) => {
    const value = e.target.value;
    setDataEdit({
      ...dataEdit,
      [e.target.name]: value,
    });
    // console.log("cek value", value);
    // console.log("cek dataEditNew", dataEdit.namaVaksin);
  };

  const handleSubmitEdit = (id) => {
    console.log("cek data edit di handlesubmit", dataEdit);
    const vaksinDataEdit = {
      id: dataEdit.id,
      stok_vaksin1: dataEdit.stok_vaksin1,
      stok_vaksin2: dataEdit.stok_vaksin2,
      vaksin1: dataEdit.vaksin1,
      vaksin2: dataEdit.vaksin2,
      waktu_akhir: dataEdit.waktu_akhir,
      waktu_awal: dataEdit.waktu_awal,
    };
    axios
      .put(
        `https://62a33b8121232ff9b21be1dd.mockapi.io/session/${id}`,
        vaksinDataEdit
      )
      .then((response) => {
        console.log(response.status);
        // console.log(response.data.token);

        if (response.status === 200) {
          toast.success("Data BERHASIL diubah");
        } else {
          toast.error("Data GAGAL diubah");
        }
      });
  };

  return (
    <NavBarList>
      <div className="sesiTersedia">
        <div className="m-10">
          <ToastContainer />
          <p className="navigasi">
            Menu &#62;{" "}
            <span className="font-semibold underline">Sesi Tersedia</span>
          </p>
          <h1 className="text-3xl font-medium">Sesi Tersedia</h1>
          {loading ? (
            <div className="flex justify-center item-center">
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
                            class="text-sm font-medium text-white px-6 py-4 text-left"
                          >
                            No
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
                            Jenis Vaksin
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-white px-6 py-4 text-left"
                          >
                            Stok Vaksin
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
                        {data.map((session) => (
                          <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {session.id}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.waktu_awal}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.waktu_akhir}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.vaksin1}
                              <br></br>
                              {session.vaksin2}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.stok_vaksin1}
                              <br></br>
                              {session.stok_vaksin2}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <button
                                className="mr-10"
                                onClick={() => {
                                  setShowModalEditVaksin(true);
                                  handleSelectEdit(session.id)
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setShowModalDeleteVaksin(true);
                                  handleSelectDelete(session.id)
                                }}
                              >
                                Delete
                              </button>
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
          <div>
            {showModalEditVaksin ? (
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
                            labelId="waktu_awal"
                            id="waktu_awal"
                            // label="Nama Vaksin"
                            name="waktu_awal"
                            type="datetime-local"
                            value={dataEdit.waktu_awal}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="waktu_akhir"
                            id="waktu_akhir"
                            // label="Nama Vaksin"
                            name="waktu_akhir"
                            type="datetime-local"
                            value={dataEdit.waktu_akhir}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="vaksin1"
                            id="vaksin1"
                            // label="Nama Vaksin"
                            name="vaksin1"
                            type="text"
                            value={dataEdit.vaksin1}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="vaksin2"
                            id="vaksin2"
                            // label="Nama Vaksin"
                            name="vaksin2"
                            type="text"
                            value={dataEdit.vaksin2}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="stok_vaksin1"
                            id="stok_vaksin1"
                            // label="Nama Vaksin"
                            name="stok_vaksin1"
                            type="number"
                            value={dataEdit.stok_vaksin1}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 200 }}>
                          {/* <InputLabel id="stok">adasdas</InputLabel> */}
                          <TextField
                            labelId="stok_vaksin2"
                            id="stok_vaksin2"
                            // label="Stok"
                            name="stok_vaksin2"
                            type="number"
                            value={dataEdit.stok_vaksin2}
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
                            handleSubmitEdit(dataEdit.id);
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
                            handleDelete(dataDelete.id);
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
