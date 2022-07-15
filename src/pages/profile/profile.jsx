import { useState, useEffect } from "react";
import NavBarList from "../../config/NavbarList";
import Cookies from "js-cookie";
import axios from "axios";
import "./profile.css"

import { ToastContainer, toast } from "react-toastify";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField, FormControl, InputLabel, IconButton } from "@mui/material";

import Avatar from '@mui/material/Avatar';


export const Profile = () => {
    const API_URL = process.env.REACT_APP_BASE_URL
    const [dataUser, setDataUser] = useState([])
    const [dataUserOld, setDataUserOld] = useState([])
    const [showModalEditProfile, setShowModalEditProfile] = useState(false)
    const [showModalGantiPassword, setShowModalGantiPassword] = useState(false)

    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    useEffect(() => {
        axios
        .get(API_URL+`/user/${Cookies.get('id')}`)
        .then((res) => {
            setDataUser(res.data.data);
        })
        .catch((err) => {
            console.log(err);
            console.log("Data gak ketemu");
        });

        axios
        .get(API_URL+`/user/${Cookies.get('id')}`)
        .then((res) => {
            setDataUserOld(res.data.data);
        })
        .catch((err) => {
            console.log(err);
            console.log("Data gak ketemu");
        });
    }, []);

    // const [values, setValues] = useState({
    //     email: "",
    //     password: "",
    //     username: "",
    //     nama: "",
    //     address: "",
    //     kota: "",
    //     noHp: "",
    // });

    const handleInput = (e) => {
    
        const name = e.target.name;
        const value = e.target.value;
    
        if (name === "email") {
          if (emailRegex.test(value)) {
            setErrorMessageEmail("");
          } else {
            setErrorMessageEmail("Email Tidak Sesuai !!!");
          }
        }
        //   else if (name === "password") {
        //   if(passwordRegex.test(value)) {
        //     setErrorMessagePassword("")
        //   } else {
        //     setErrorMessagePassword("Password Tidak Sesuai !!!")
        //   }
        // }
    
        setDataUser({
          ...dataUser,
          [name]: value,
        });
        // setTimeout(e, 1000);
      };

    //   console.log("cek values", dataUser)

      const handleReset = () => {
        setDataUser(dataUserOld)
      }

      const KonfirmEdit = () => {
        setShowModalEditProfile(true)
      }

      const handleSubmit = (e) => {
        // e.preventDefault()
        const editProfile = {
          email: dataUser.username,
          noHp: dataUser.noHp,
          nama: dataUser.nama,
          image: dataUser.image,
          address: dataUser.address,
          kota: dataUser.kota  
        }

        axios
        .put(
          API_URL+`/user/health/${dataUser.idUser}`,
          editProfile, {
            headers: {
                'Authorization' : `Bearer ${Cookies.get('jwt')}`
              }
          }
        )
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            toast.success("Data BERHASIL diubah");
          } else {
            toast.error("Data GAGAL diubah");
          }
        })
        .catch((err) => {
            toast.error("Data GAGAL diubah");
        });
      }

      const [changePassword, setChangePassword] = useState({
        passwordLama : "",
        passwordBaru : ""
      })

      const handleChangeGantiPassword = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setChangePassword({
            ...changePassword,
            [name]: value,
        });
      }
      console.log(changePassword)

      const handleGantiPassword = () => {
        setShowModalGantiPassword(true);
      }

      const handleSubmitPassword = (e) => {
        // e.preventDefault()
        const gantiPassword = {
            currentPassword: changePassword.passwordLama,
            newPassword: changePassword.passwordBaru
        }

        axios
        .put(API_URL+`/user/change-password`, gantiPassword, {
            headers: {
                'Authorization' : `Bearer ${Cookies.get('jwt')}`
              }
        })
        .then((res) => {
            console.log(res.status);
            toast.success("Ganti password berhasil")
        })
        .catch((err) => {
            toast.error("Ganti password gagal")
        });
    };
      

      const handleClickShowPassword = () => {
        setDataUser({
          ...dataUser,
          showPassword: !dataUser?.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    return (
    <NavBarList>
    <ToastContainer />
      <div className="m-16 profile">
        <div className="w-full h-100 bg-blue-50 cover"></div>
        <div className="grid md:grid-cols-5 border-b-1 pb-20">
            <div className="md:col-span-2">
                <div className="mx-auto w-fit">
                    {/* <Avatar alt={dataUser.nama} src={dataUser.image} sx={{ width: 215, height: 215 }}/> */}
                    <img src={dataUser.image} className="h-136 w-136 object-cover rounded-full border-4 border-white -mt-20"></img>
                </div>
            </div>
            <div className="md:col-span-3 flex item-center">
                <div className="h-fit my-auto mx-auto md:mx-10">
                    <p className="text-24 font-600 md:text-left text-center">{dataUser.nama}</p>
                    <p className="text-10 md:text-left text-center">{dataUser.kota}</p>
                </div>
            </div>
        </div>
        <div className="mt-10 pt-8 mx-56">
            <form onSubmit={handleSubmit}>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="">
                        <th className="w-1/4"></th>
                        <th className="w-3/4"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-52 border-b-1 border-gray-200 mb-20">
                        <td>Nama</td>
                        <td>
                            <div className="">
                                <TextField
                                    fullWidth
                                    name="nama"
                                    size="small"
                                    className="inputRounded"
                                    style={{ }}
                                    variant="outlined"
                                    value={dataUser.nama}
                                    onChange={handleInput}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className="h-52 border-b-1 border-gray-200 mb-20">
                        <td>Username</td>
                        <td>
                            <div className="">
                                <TextField
                                    fullWidth
                                    name="username"
                                    size="small"
                                    className="inputRounded"
                                    style={{ }}
                                    variant="outlined"
                                    value={dataUser.username}
                                    onChange={handleInput}
                                />
                            </div>
                        </td>
                    </tr>
                    {/* <tr className="h-52 border-b-1 border-gray-200 mb-20">
                        <td>Password</td>
                        <td>
                        <FormControl fullWidth variant="outlined" className="inputRounded">
                            <OutlinedInput
                                // className="inputRounded"
                                size="small"
                                error={errorMessagePassword === "" ? false : true}
                                name="password"
                                value={dataUser.password}
                                type={dataUser?.showPassword ? "text" : "password"}
                                onChange={handleInput}
                                endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {dataUser.showPassword ? (
                                    <VisibilityOff />
                                    ) : (
                                    <Visibility />
                                    )}
                                </IconButton>
                                </InputAdornment>
                            }
                            />
                            <FormHelperText error>
                            {errorMessagePassword}
                            </FormHelperText>
                        </FormControl>
                        </td>
                    </tr> */}
                    <tr className="h-52 border-b-1 border-gray-200 mb-20">
                        <td>Kota</td>
                        <td>
                            <div className="">
                                <TextField
                                    fullWidth
                                    name="kota"
                                    size="small"
                                    className="inputRounded"
                                    style={{ }}
                                    variant="outlined"
                                    value={dataUser.kota}
                                    onChange={handleInput}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className="h-52 border-b-1 border-gray-200 mb-20">
                        <td>Alamat</td>
                        <td>
                            <div className="">
                                <TextField
                                    fullWidth
                                    name="address"
                                    size="small"
                                    className="inputRounded"
                                    style={{ }}
                                    variant="outlined"
                                    value={dataUser.address}
                                    onChange={handleInput}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className="h-52 border-b-1 border-gray-200 mb-20">
                        <td>No Telepon</td>
                        <td>
                            <div className="">
                                <TextField
                                    fullWidth
                                    name="noHp"
                                    size="small"
                                    className="inputRounded"
                                    style={{ }}
                                    variant="outlined"
                                    value={dataUser.noHp}
                                    onChange={handleInput}
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex item-center mt-10">
                <div className="flex justify-end w-full">
                    <button className="text-blue-600 border-1 border-blue-600 px-10 py-2 rounded-md m-5" type="button" onClick={handleReset}>Cancel</button>
                    <button className="bg-blue-600 border-1 border-blue-600 text-white rounded-md m-5 px-10 py-2" type="button" onClick={KonfirmEdit}>Edit</button>
                    <button className="bg-blue-600 border-1 border-blue-600 text-white rounded-md my-5 ml-5 px-10 py-2" type="button" onClick={handleGantiPassword}>Ganti Password</button>
                </div>
            </div>
            </form>
        </div>
        <div>
        {showModalEditProfile ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="my-10 mx-auto">Edit Profile</h3>
                      </div>
                      {/*body*/}
                      <form onSubmit = {() => {
                              setShowModalEditProfile(false);
                              handleSubmit();
                        }}>
                        <div className="m-10">
                            <p className="text-9 m-0">Apakah Anda yakin ingin mengubah data?</p>
                          {/* <FormControl sx={{ m: 1, width: 400 }}>
                            <TextField
                              labelId="email"
                              id="email"
                              name="email"
                              type="email"
                              value={dataUser.email}
                              onChange={handleInput}
                            />
                          </FormControl> */}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent px-6 py-2 text-11 outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModalEditProfile(false)}
                          >
                            Tutup
                          </button>
                          <button
                            className="bg-blue-600 text-white text-11 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Edit Profile
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : //AKHIR MODAL EDIT PROFILE
            null}

            {showModalGantiPassword ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="my-10 mx-auto">Konfirmasi Ganti Password</h3>
                      </div>
                      {/*body*/}
                      <form onSubmit = {() => {
                              setShowModalGantiPassword(false);
                              handleSubmitPassword();
                        }}>
                        <div className="m-10">
                          <p className="ml-6 -mb-4 text-9">Masukkan password lama</p>
                          <FormControl sx={{ m: 1, width: 400 }}>
                            <TextField
                              labelId="passwordLama"
                              id="passwordLama"
                              name="passwordLama"
                              type="password"
                              value={changePassword.passwordLama}
                              onChange={handleChangeGantiPassword}
                            />
                          </FormControl>
                          <p className="ml-6 -mb-4 text-9">Masukkan password baru</p>
                          <FormControl sx={{ m: 1, width: 400 }}>
                            <TextField
                              labelId="passwordBaru"
                              id="passwordBaru"
                              name="passwordBaru"
                              type="password"
                              value={changePassword.passwordBaru}
                              onChange={handleChangeGantiPassword}
                            />
                          </FormControl>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent px-6 py-2 text-11 outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModalGantiPassword(false)}
                          >
                            Tutup
                          </button>
                          <button
                            className="bg-blue-600 text-white text-11 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Konfirm
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : //AKHIR MODAL EDIT VAKSIN
            null}
        </div>
      </div>
    </NavBarList>
    )
  };