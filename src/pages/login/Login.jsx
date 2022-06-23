import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "./login.css"
// import App  from "../../App"

import { AiFillHeart, AiTwotoneFileExclamation, AiFillSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { TextField, FormControl, InputLabel } from '@mui/material';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login(props) {
  const [open, setOpen] = React.useState(false);
  console.log("propsss",props)

  const handleClickOpen = (props) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className='login'>
      <div>
        <AppBar 
          position="static" 
          style={{
            backgroundColor: "white",
            fontFamily: "Inter",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          }}>
            <Toolbar>
              <div className='flex flex-row justify-between navbar'>
                <div>
                  <h1 className="navbar-brand ml-8">VaksinQu</h1>
                </div>
                <div className='flex flex-row-reverse justify-end items-center'>
                  <div className='flex flex-row justify-end items-center navbar-icon'>
                    <IoMdNotifications className='mr-10'/>
                    <AiFillSetting />
                  </div>
                  <div className='flex flex-row items-center'>
                    <BiSearch className="search-icon"/>
                    <input placeholder='search...'></input>
                  </div>
                </div>
              </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1'>
        <div className='mx-auto py-20 px-20'>
          <h5 className='text-20 font-700 mb-16 mt-76'>Login to Your Account</h5>
          <p>Halo, petugas fasilitas kesehatan</p>
          <p>Masukkan data yang dibutuhkan untuk dapat mengakses akunmu</p>
          <div className='mt-40'>
            <div className='mb-12'>
              <p className='mb-5'>Email</p>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  labelId="email"
                  id="email"
                  label="Email"
                  name='email'
                  type="text"
                  // onChange={handleChange}
                />
              </FormControl>
            </div>
            <div>
              <p className='mb-5'>Password</p>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  labelId="passsword"
                  id="passsword"
                  label="Password"
                  name='passsword'
                  type="text"
                  // onChange={handleChange}
                />
              </FormControl>
            </div>
          </div>
          <Link to="/">
            <button
              className="bg-blue-700 text-white w-full h-24 text-10 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-20 ease-linear transition-all duration-150"
              type="button"
            >
              Login
            </button>
          </Link>
        </div>
        <div className='py-20 mx-auto gambarLogin'>
          <img src='https://cdn.discordapp.com/attachments/816934520837898244/989119966815072256/Gambar.png' className='mt-51'></img>
        </div>
      </div>
        {/* <Router>
          <Routes>
            <Route path="/app" element={<App/>}/>
          </Routes>
      </Router> */}
    </div>
  );

  // return (
  //   <div>
  //     <Button variant="outlined" onClick={handleClickOpen}>
  //       Slide in alert dialog
  //     </Button>
  //     <Dialog
  //       open={open}
  //       TransitionComponent={Transition}
  //       keepMounted
  //       onClose={handleClose}
  //       aria-describedby="alert-dialog-slide-description"
  //     >
  //       <DialogTitle>{"Use Google's location service?"}</DialogTitle>
  //       <DialogContent>
  //         <DialogContentText id="alert-dialog-slide-description">
  //           Let Google help apps determine location. This means sending anonymous
  //           location data to Google, even when no apps are running.
  //         </DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleClose}>Disagree</Button>
  //         <Button onClick={handleClose}>Agree</Button>
  //       </DialogActions>
  //     </Dialog>
  //   </div>
  // );
}
