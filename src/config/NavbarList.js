import * as React from 'react';
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SiderBar from "../components/Sidebar";
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
    icon: <FaHome />,
  },
  {
    path: "/fitur",
    name: "Menu",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/fitur/tiketVaksin",
        name: "Atur Sesi Tiket Vaksin ",
        icon: <FaUser />,
      },
      {
        path: "/fitur/kelolaPesananTiket",
        name: "Kelola Pesanan Tiket",
        icon: <FaLock />,
      },
      {
        path: "/fitur/aturVaksin",
        name: "Atur Vaksin",
        icon: <FaMoneyBill />,
      },
    ],
  },
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <BsCartCheck />,
  // },
  {
    path: "/fungsi",
    name: "Setting",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/fungsi/satu",
        name: "Fungsi1",
        icon: <FaUser />,
      },
      {
        path: "/fungsi/dua",
        name: "Fungsi2",
        icon: <FaLock />,
      },
      {
        path: "/fungsi/tiga",
        name: "Fungsi3",
        icon: <FaMoneyBill />,
      },
    ],
  },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  console.log("propss", props)
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBarList = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
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
  return (
    <>
      <AppBar 
        position="static" 
        style={{
          backgroundColor: "white",
          fontFamily: "Inter",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        }}>
        <Toolbar>
            <h1 className="navbar-brand ml-8">VaksinQu</h1>
        </Toolbar>
      </AppBar>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "300px" : "55px",

            transition: {
              duration: 0.5,
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
                  className="logo"
                >
                  VaksinQu
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="profile m-5">
            <AnimatePresence>
              {isOpen && (
              <div class="flex justify-center my-10">
                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                  {/* <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt=""/>
                  </a> */}
                  <div class="p-6">
                    <h5 class="text-gray-900 text-10 font-medium m-2 ">RS PHC Surabaya</h5>
                    <p class="text-gray-700 text-base mb-4">
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
          <section className="routes">
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
