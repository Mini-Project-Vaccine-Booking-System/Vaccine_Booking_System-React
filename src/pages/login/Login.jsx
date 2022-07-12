import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";

import axiosInstance from "../../networks/api";
import "./login.css";

import {
  AiFillHeart,
  AiTwotoneFileExclamation,
  AiFillSetting,
} from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import {
  AppBar,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { TextField, FormControl, InputLabel } from "@mui/material";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login(props) {
  // const [open, setOpen] = React.useState(false);
  // console.log("propsss",props)

  // const handleClickOpen = (props) => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const [data, setData] = useState()

  // const myContext = useContext(AppContext)

  // ==============================================================================
  const API_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [loading, setLoading] = useState(false);

  const [dataUser, setDataUser] = useState();

  const getData = async () => {
    setLoading(true);
    // const url = "https://62a33b8121232ff9b21be1dd.mockapi.io/vaccine";
    const url = API_URL + "/user";
    // const url = "https://vaccine-api-strapi.herokuapp.com/api/vaccines";
    try {
      const res = await axios.get(url);
      // console.log(res.data.data);
      setDataUser(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   axios.get(API_URL+"/user").then((res) => {
  //     setDataUser(res.data.data)
  //     // console.log(res.data.data);
  //   })
  //   .catch((err) => {
  //       console.log(err);
  //       console.log("Data gak ketemu")
  //       // setError("Data gak ketemu")
  //   })
  // }, []);
  // console.log("cek data user", dataUser)

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

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

    setValues({
      ...values,
      [name]: value,
    });
    // setTimeout(e, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAuth = dataUser?.find((el) => {
      if (el.email === values.email && el.password === values.password) {
        
        return true;
      }
      return false;
    });
    if (isAuth === undefined) {
      alert("data ga ada");
    }
    navigate("/");
    Cookies.set("id", isAuth.idUser);
    Cookies.set("nama", isAuth.nama);
    Cookies.set("kota", isAuth.kota);
    Cookies.set("image", isAuth.image);
    console.log("cek manual login", isAuth);
  };

  // ====================================================================

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if(errorMessageEmail !== "") {
  //     alert("Terdapat data yang tidak sesuai")
  //   } else if(errorMessagePassword !== "") {
  //     alert("Terdapat data yang tidak sesuai")
  //   } else {

  //     axiosInstance
  //       .post("/auth/local", {
  //         identifier: values.email,
  //         password: values.password,
  //       })
  //       .then((response) => {
  //         navigate("/");
  //         console.log("cek respon login" , response)
  //         Cookies.set("jwt", response.data.jwt);

  //         // if(response.status !== 200) {
  //         //   setLoginFailed("Email atau Password Salah")
  //         // }
  //       })
  //       .catch((error) => {
  //         setLoginFailed("Email atau Password Salah !!!")
  //         console.log(error);
  //       });

  //   }
  // }

  // ================================================

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values?.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <div>
        <AppBar
          // position="static"
          className="sticky -top-0"
          style={{
            backgroundColor: "white",
            fontFamily: "Inter",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <Toolbar>
            <div className="flex flex-row justify-between navbar">
              <div>
                <h1 className="navbar-brand ml-8">VaksinQu</h1>
              </div>
              {/* <div className='flex flex-row-reverse justify-end items-center'>
                  <div className='flex flex-row justify-end items-center navbar-icon'>
                    <IoMdNotifications className='mr-10'/>
                    <AiFillSetting />
                  </div>
                  <div className='flex flex-row items-center'>
                    <BiSearch className="search-icon"/>
                    <input placeholder='search...'></input>
                  </div>
                </div> */}
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {loading ? (
        <>
          <div className=" mt-76 flex justify-center items-center">
            <CircularProgress />
          </div>
          <div className="flex justify-center items-center">
            <h1>LOADING</h1>
          </div>
        </>
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="mx-auto py-20 px-20">
            <h5 className="text-20 font-700 mb-16 mt-76">
              Login to Your Account
            </h5>
            <p>Halo, petugas fasilitas kesehatan</p>
            <p>Masukkan data yang dibutuhkan untuk dapat mengakses akunmu</p>
            <div className="mt-40">
              <form onSubmit={handleSubmit}>
                <div className="mb-12">
                  <p className="mb-5">Email</p>
                  <FormControl fullWidth>
                    <TextField
                      focused
                      required
                      error={errorMessageEmail === "" ? false : true}
                      fullWidth
                      labelId="email"
                      id="email"
                      label="Email"
                      name="email"
                      type="text"
                      onChange={handleInput}
                      helperText={errorMessageEmail}
                    />
                  </FormControl>
                </div>
                <div>
                  <p className="mb-5">Password</p>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      required
                      error={errorMessagePassword === "" ? false : true}
                      name="password"
                      id="outlined-adornment-password"
                      type={values?.showPassword ? "text" : "password"}
                      onChange={handleInput}
                      helperText={errorMessagePassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <FormHelperText error>
                      {errorMessagePassword}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Login"
                    className="bg-blue-700 cursor-pointer text-white w-full h-24 text-10 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-20 ease-linear transition-all duration-150"
                  ></input>
                </div>
              </form>
              <p className="mt-10 text-right text-red font-400">
                {loginFailed}
              </p>
            </div>
            {/* <Link to="/">
            <button
              className="bg-blue-700 text-white w-full h-24 text-10 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-20 ease-linear transition-all duration-150"
              type="button"
            >
              Login
            </button>
          </Link> */}
          </div>
          <div className="py-20 mx-auto gambarLogin">
            <img
              src="https://cdn.discordapp.com/attachments/816934520837898244/989119966815072256/Gambar.png"
              className="mt-51"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}
