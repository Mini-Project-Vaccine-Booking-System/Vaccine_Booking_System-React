import { CircularProgress } from "@mui/material";
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
  //     useEffect(() => {
  //         axios.get("https://62a33b8121232ff9b21be1dd.mockapi.io/session").then((res) => {
  //         setData(res.data)
  //         console.log(res.data);
  //         })
  //         .catch((err) => {
  //         console.log(err);
  //         console.log("Data gak ketemu")
  //         setError("Data gak ketemu")
  //         })
  // }, []);

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
                            {/* <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button className='mr-10' 
                                                    // onClick={() => {
                                                    //     setShowModalEditVaksin(true);
                                                    //     handleSelectEdit(bookings.id)
                                                    //     }}
                                                    >Edit</button>
                                                    <button 
                                                        // onClick={() => {
                                                        //     handleSelectDelete(bookings.id);
                                                        //     setShowModalDeleteVaksin(true);}}
                                                    >Delete</button>
                                                </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavBarList>
  );
};
