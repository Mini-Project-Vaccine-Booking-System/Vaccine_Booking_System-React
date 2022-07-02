import { CircularProgress, FormControl, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarList from "../../../config/NavbarList";
import "./sesiTersedia.css";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

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
    // const url = "https://62a33b8121232ff9b21be1dd.mockapi.io/session";
    const url = "https://booking-vaksin-alta.herokuapp.com/api/session/user/14";
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

  // const filteredData = data.filter(sesi => {
  //   return sesi.user.idUser === 14
  // })

  // console.log("data difilter", filteredData)

  // handleDelete

  const handleSelectDelete = (id) => {
    console.log("cek id delete", id);
    axios
      .get(`https://booking-vaksin-alta.herokuapp.com/api/session/${id}`)
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
      .delete(`https://booking-vaksin-alta.herokuapp.com/api/session/${id}`)
      .then((response) => {
        console.log("datax berhasil di hapus",response.status);
        // console.log(response.data.token);

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

  // endHandleDelete


  const handleSelectEdit = (id) => {
    console.log("cek id edit", id);
    //GETDATA By ID
    axios
      .get(`https://booking-vaksin-alta.herokuapp.com/api/session/${id}`)
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

    // console.log("cek value", e.target.name+value);
    // console.log("cek dataEditNew", dataEdit.namaVaksin);
  };

  const newDate = dataEdit?.date?.substring(0,10);
  console.log("new Date", newDate)

  const handleSubmitEdit = (id) => {
    // console.log("cek data edit di handlesubmit", dataEdit);
    const vaksinDataEdit = {
      id_health: 14,
      nama: dataEdit.vaksin.nama,
      date: dataEdit.date.substring(0, 10),
      start: dataEdit.start,
      end: dataEdit.end,
    };
    axios
      .put(
        `https://booking-vaksin-alta.herokuapp.com/api/session/${id}`,
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
      setTimeout(() => {
        window.location.reload(false);
    }, 1400);
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
                            Tanggal
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
                              {session.idSession}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.date.substring(0, 10)}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.start}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.end}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.vaksin.nama}
                              <br></br>
                              {session.vaksin2}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {session.vaksin.quantity}
                              <br></br>
                              {session.stok_vaksin2}
                            </td>
                            <td class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-row gap-5">
                                <TbEdit
                                  style={{
                                    cursor: "pointer"
                                  }}
                                  size="25px"
                                  color="rgba(135, 187, 134, 1)"
                                  onClick={() => {
                                    setShowModalEditVaksin(true);
                                    handleSelectEdit(session.idSession)
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
                                    handleSelectDelete(session.idSession)
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
                      <div className="p-6 flex flex-col">
                        <FormControl sx={{ m: 1, width: 200 }}>
                          {/* <InputLabel id="stok">adasdas</InputLabel> */}
                          <TextField
                            disabled
                            labelId="idSession"
                            id="idSession"
                            // label="Stok"
                            name="idSession"
                            type="number"
                            value={dataEdit.idSession}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="date"
                            id="date"
                            // label="Nama Vaksin"
                            name="date"
                            type="date"
                            value={newDate}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <input 
                          className="border-1 border-gray-400 rounded-2 p-5 m-5"
                          type="time" 
                          step="1"
                          name="start"
                          value={dataEdit.start}
                          onChange={handleChangeUpdate}
                        >
                        </input>
                        <input 
                          className="border-1 border-gray-400 rounded-2 p-5 m-5"
                          type="time" 
                          step="1"
                          name="end"
                          value={dataEdit.end}
                          onChange={handleChangeUpdate}
                        >
                        </input>
                        {/* <FormControl sx={{ m: 1, width: 400 }}>
                          <TextField
                            labelId="start"
                            id="start"
                            name="start"
                            type="time"
                            step="1"
                            value={dataEdit.start}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 400 }}>
                          <TextField
                            labelId="end"
                            id="end"
                            name="end"
                            type="time"
                            step="1"
                            value={dataEdit.end}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl> */}
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="vaksin"
                            id="vaksin"
                            // label="Nama Vaksin"
                            name="vaksin"
                            type="text"
                            value={dataEdit.vaksin?.nama}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 400 }}>
                          {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
                          <TextField
                            labelId="quantity"
                            id="quantity"
                            // label="Nama Vaksin"
                            name="quantity"
                            type="number"
                            value={dataEdit.vaksin?.quantity}
                            onChange={handleChangeUpdate}
                          />
                        </FormControl>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent px-6 py-2 text-11 outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModalEditVaksin(false)}
                        >
                          Tutup
                        </button>
                        <button
                          className="bg-blue-600 text-white text-11 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModalEditVaksin(false);
                            handleSubmitEdit(dataEdit.idSession);
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
                            {dataDelete.idSession}
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
                            handleDelete(dataDelete.idSession);
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
