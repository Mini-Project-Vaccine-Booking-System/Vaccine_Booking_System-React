import * as React from 'react';
import { NavLink } from "react-router-dom";

import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaTicketAlt, FaBookOpen } from "react-icons/fa";
import { MdMessage, MdDashboard, MdOutlineEventAvailable } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation, AiFillSetting } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { TbVaccineBottle, TbVaccine } from "react-icons/tb"
import { IoLogOut } from "react-icons/io5"
import { IoMdNotifications } from "react-icons/io"
import { TextField, FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SiderBar from "../components/Sidebar/Sidebar";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import "./navbar.css"

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <MdDashboard />,
  },
  {
    path: "/fitur",
    name: "Menu",
    icon: <TbVaccineBottle 
              style={{
                marginLeft: "-3px",
              }}
              size="22px"/>,
    subRoutes: [
      {
        path: "/fitur/tiketVaksin",
        name: "Atur Sesi Tiket Vaksin ",
        icon: <FaTicketAlt />,
      },
      {
        path: "/fitur/sesiTersedia",
        name: "Sesi Tersedia ",
        icon: <MdOutlineEventAvailable />,
      },
      {
        path: "/fitur/kelolaPesananTiket",
        name: "Kelola Pesanan Tiket",
        icon: <FaBookOpen />,
      },
      {
        path: "/fitur/aturVaksin",
        name: "Atur Vaksin",
        icon: <TbVaccine />,
      },
    ],
  },
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <BsCartCheck />,
  // },
  {
    path: "/login",
    name: "Logout",
    icon: <IoLogOut />,
    
  },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  console.log("propss", props)
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBarList = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  // handle Login Popup
  const [openLog, setOpenLog] = useState(false);
  const handleClickOpenLog = () => {
    setOpenLog(true);
  };

  const handleCloseLog = () => {
    setOpenLog(false);
  };

  //Hanlde PopUp Settings
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('jwt', { path: '/'});
    // setTimeout(() => {
    //   navigate("/login");
    // }, 2500);
  }

  const handleNavigate = () => {
    navigate("/login");
  }


  return (
    <>
      <AppBar 
        position="sticky" 
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
                  <IoMdNotifications/>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AiFillSetting size="21px"/>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={() => {
                          handleLogout();
                          handleNavigate();
                        }}
                      >Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                <div className='flex flex-row items-center'>
                  <BiSearch className="search-icon"/>
                  <input placeholder='search...'></input>
                </div>
              </div>
            </div>
        </Toolbar>
      </AppBar>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "400px" : "55px",

            transition: {
              duration: 0.3,
              type: "spring",
              damping: 15,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo ml-5"
                >
                  VaksinQu
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars ml-6">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="profile m-5">
            <AnimatePresence>
              {isOpen && (
              <div class="flex justify-center my-10">
                <div class="rounded-lg shadow-lg bg-blue-400 w-176">
                  <div class="p-10">
                    <img src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg" className='w-53 h-53 mb-10 rounded-lg'/>
                    <h5 class="text-white text-sm font-medium ">RS PHC Surabaya</h5>
                    <p class="text-white text-10 mb-4">
                      Surabaya, Jawa Timur
                    </p>
                  </div>
                </div>
              </div>  
              )}
            </AnimatePresence>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes ml-5">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SiderBar
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default NavBarList;
