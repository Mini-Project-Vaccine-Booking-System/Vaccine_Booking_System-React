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

      const handleSubmit = (e) => {
        e.preventDefault()
        const editProfile = {
          email: dataUser.email,
          username: dataUser.username,
          password: dataUser.password,
          role: dataUser.role,
          noHp: dataUser.noHp,
          nama: dataUser.nama,
          image: dataUser.image,
          address: dataUser.address,
          kota: dataUser.kota  
        }

        axios
        .put(
          API_URL+`/user/${dataUser.idUser}`,
          editProfile
        )
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            toast.success("Data BERHASIL diubah");
          } else {
            toast.error("Data GAGAL diubah");
          }
        });
      }

      const handleClickShowPassword = () => {
        setDataUser({
          ...dataUser,
          showPassword: !dataUser?.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    // const [newImage, setNewImage] = useState('')
    // useEffect(() => {
    //     setNewImage(Cookies.get('image'))
    //     if (newImage === undefined || newImage === null || newImage === "") {
    //     setNewImage("https://firebasestorage.googleapis.com/v0/b/mini-project-alterra-c451b.appspot.com/o/Capstone_Vaccine%20Booking%20System%2F1603039115321.jpg?alt=media&token=087b0f22-5e82-4695-a8d7-71205a72df67")
    //     } else {
    //     setNewImage(newImage)
    //     }
    // }, []);

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
                        <td>Email</td>
                        <td>
                            <div className="">
                                <TextField
                                    fullWidth
                                    name="email"
                                    size="small"
                                    className="inputRounded"
                                    style={{ }}
                                    variant="outlined"
                                    value={dataUser.email}
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
                    <tr className="h-52 border-b-1 border-gray-200 mb-20">
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
                    </tr>
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
                <div className="h-fit my-auto mx-auto md:mx-10">
                    <button className="text-blue-600 border-1 border-blue-600 px-10 py-2 rounded-md m-5" type="button" onClick={handleReset}>Cancel</button>
                    <button className="bg-blue-600 border-1 border-blue-600 text-white rounded-md m-5 px-10 py-2" type="submit">Edit</button>
                </div>
            </div>
            </form>
        </div>
      </div>
    </NavBarList>
    )
  };