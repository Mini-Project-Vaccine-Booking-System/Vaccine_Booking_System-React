import * as React from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

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
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SiderBar from "../components/Sidebar/Sidebar";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

import Slide from '@mui/material/Slide';


import "./navbar.css"


const Transition = React.forwardRef(function Transition(props, ref) {
  console.log("propss", props)
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBarList = ({ children }) => {

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
    //   path: "/login",
    //   name: "Logout",
    //   icon: <IoLogOut 
    //   onClick={() => {
    //     handleLogout();
    //   }}/>,
      
    // },
  ];
  
  const API_URL = process.env.REACT_APP_BASE_URL
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

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  //========================= Menu Navbar ===========================

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('id', { path: '/'});
  }

  const handleNavigate = () => {
    navigate("/login");
  }


  // ==========================GET USER DATA============================

  const [dataUser, setDataUser] = useState([])
  const [newImage, setNewImage] = useState('')

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
  }, []);

  // console.log("data user", dataUser)

  // useEffect(() => {
  //   setNewImage(dataUser.image)
  //   if (newImage !== undefined || newImage !== null || newImage !== "") {
  //     setNewImage(dataUser.image)
  //     // console.log("data poto ada")
  //   } else {
  //     setNewImage("https://firebasestorage.googleapis.com/v0/b/mini-project-alterra-c451b.appspot.com/o/Capstone_Vaccine%20Booking%20System%2F1603039115321.jpg?alt=media&token=087b0f22-5e82-4695-a8d7-71205a72df67")
  //     // console.log("data GA poto ada")
  //   }
  // }, []);

  // console.log("cek imgd", newImage)


  return (
    <>
      <AppBar 
        position="sticky" 
        className='md:sticky'
        style={{
          backgroundColor: "white",
          fontFamily: "Inter",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        }}>
          <Toolbar>
            <div className='flex flex-row justify-between navbar'>
              <div>
                <Link to="/"><h1 className="navbar-brand ml-8">VaksinQu</h1></Link>
              </div>
              <div className='flex flex-row-reverse justify-end items-center'>
                <div className='flex flex-row justify-end items-center navbar-icon'>
                  <IoMdNotifications/>
                  <div>
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar alt={Cookies.get('nama')} src={dataUser?.image} sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <Link to="/profile"><MenuItem>
                        <Avatar alt={dataUser.nama} src={dataUser.image}/> Profile
                      </MenuItem></Link>
                      <Divider />
                      {/* <MenuItem>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem> */}
                      <MenuItem onClick={() => {
                          handleLogout();
                          handleNavigate();
                        }}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
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
                    <img src={dataUser.image} className='w-53 h-53 mb-10 rounded-lg'/>
                    <h5 class="text-white text-sm font-medium ">{dataUser.nama}</h5>
                    <p class="text-white text-10 mb-4">
                      {dataUser.kota}
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
                index === 2 ? 
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={() => {
                    handleLogout();
                  }}
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
                </NavLink> : 
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
