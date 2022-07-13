import * as React from "react";
import { Axios } from "axios";
import { gql, useQuery } from "@apollo/client";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Gejala } from "./grafik/Gejala";
import { Perawatan } from "./grafik/Perawatan";
import { Pencegahan } from "./grafik/Pencegahan";

import "./home.css";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import CardBerita from "./berita/cardBerita";
import NavBarList from "../config/NavbarList";
import {
  CircularProgress,
  LinearProgress,
  Skeleton,
  Stack,
} from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const GetNews = gql`
  query MyQuery {
    API_Berita(limit: 3) {
      author
      content
      description
      id
      source
      title
      url
      urlToImage
      publishedAt
    }
  }
`;

export default function Home(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // =======================DATA COVID=========================

  const [totalKasus, setTotalKasus] = useState();
  const [totalSembuh, setTotalSembuh] = useState();
  const [totalMeninggal, setTotalMeninggal] = useState();
  const [load, setLoad] = useState(false);
  const [loadCard, setLoadCard] = useState(false);
  const axios = require("axios");

  const options = {
    method: "GET",
    url: process.env.REACT_APP_COVID_API_URL,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_COVID_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_COVID_API_HOST,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setLoad(true);
        // console.log(response.data[18]);
        setTotalKasus(response.data[18].TotalCases);
        setTotalSembuh(response.data[18].TotalRecovered);
        setTotalMeninggal(response.data[18].TotalDeaths);
      })
      .catch(function (error) {
        console.error(error);
      });
    setLoad(false);
  }, []);

  // ==========================================================
  // ===================DATA BERITA============================

  const { data: dataBerita, loading, error } = useQuery(GetNews);
  // console.log("cek data berita", dataBerita)

  // useEffect(() => {
  //     axios.get(process.env.REACT_APP_NEWS_API).then((res) => {
  //         setDataBerita(res.data.articles)
  //         console.log(res.data.articles);
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //         console.log("Data gak ketemu")
  //         // setError("Data gak ketemu")
  //     })

  // }, []);

  // console.log("test state", dataBerita)

  return (
    <NavBarList>
      <div className="home">
        <div className="ml-5 mt-5">
          <p className="navigasi">
            <span className="font-semibold ">Dashboard</span>
          </p>
          <div className="grid lg:grid-cols-4 gap-x-2.5 grid-cols-1">
            <div className="col-span-3">
              <h1 className="text-2xl font-bold mb-10">Dashboard</h1>
              <p className="font-semibold text-gray-600 mb-10">
                Total Kasus Perkembangan COVID-19 Hari ini di Indonesia
              </p>
              <div className="flex flex-row flex-wrap justify-evenly mb-10">
                {load ? (
                  <div class="flex justify-center mb-10">
                    <div class="rounded-lg shadow-lg w-136 cardPositifCovid">
                      <a href="#!">
                        <img
                          class="mx-auto mt-10"
                          src="https://cdn.discordapp.com/attachments/816934520837898244/987690227206344714/Group_28.png"
                          alt=""
                        />
                      </a>
                      <div class="p-6 mx-auto">
                        <h5 class="text-white text-10 font-300 text-center">
                          Positif COVID
                        </h5>
                        <p class="text-white text-sm font-600 text-center">
                          {totalKasus}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Stack spacing={1}>
                    <div className="flex flex-col-reverse justify-center items-center">
                      <Skeleton variant="text" className="w-1/2" />
                      <Skeleton variant="circular" width={50} height={50} />
                    </div>
                    <Skeleton variant="rectangular" width={210} height={55} />
                  </Stack>
                )}
                {load ? (
                  <div class="flex justify-center mb-10">
                    <div class="rounded-lg shadow-lg w-136 cardSembuh">
                      <a href="#!">
                        <img
                          class="mx-auto mt-10"
                          src="https://cdn.discordapp.com/attachments/816934520837898244/987690227697082408/Group_52.png"
                          alt=""
                        />
                      </a>
                      <div class="p-6 mx-auto">
                        <h5 class="text-white text-10 font-300 text-center">
                          Sembuh
                        </h5>
                        <p class="text-white text-sm font-600 text-center">
                          {totalSembuh}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Stack spacing={1}>
                    <div className="flex flex-col-reverse justify-center items-center">
                      <Skeleton variant="text" className="w-1/2" />
                      <Skeleton variant="circular" width={50} height={50} />
                    </div>
                    <Skeleton variant="rectangular" width={210} height={55} />
                  </Stack>
                )}
                {load ? (
                  <div class="flex justify-center mb-10">
                    <div class="rounded-lg shadow-lg w-136 cardMeninggal">
                      <a href="#!">
                        <img
                          class="mx-auto mt-10"
                          src="https://cdn.discordapp.com/attachments/816934520837898244/987690228015853639/Group_16.png"
                          alt=""
                        />
                      </a>
                      <div class="p-6 mx-auto">
                        <h5 class="text-white text-10 font-300 text-center">
                          Meninggal
                        </h5>
                        <p class="text-white text-sm font-600 text-center">
                          {totalMeninggal}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Stack spacing={1}>
                    <div className="flex flex-col-reverse justify-center items-center">
                      <Skeleton variant="text" className="w-1/2" />
                      <Skeleton variant="circular" width={50} height={50} />
                    </div>
                    <Skeleton variant="rectangular" width={210} height={55} />
                  </Stack>
                )}
              </div>
              <div className="flex flex-row items-center">
                <img src="https://cdn.discordapp.com/attachments/816934520837898244/989046377990467604/Info.png"></img>
                <h2 className="text-17 font-600 ml-10 mt-4">
                  Tentang Penyakit Coronavirus (COVID-19)
                </h2>
              </div>
              <p className="fontTiny ml-8 my-5">
                Informasi mengenai gejala yang timbul, cara penyembuhan, dan
                pencegahan dari penyakit coronavirus
              </p>

              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Gejala" {...a11yProps(0)} />
                    <Tab label="Perawatan" {...a11yProps(1)} />
                    <Tab label="Pencegahan" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Gejala />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Perawatan />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Pencegahan />
                </TabPanel>
              </Box>
            </div>
            <div className="">
              <div className="flex flex-row items-center">
                <img src="https://cdn.discordapp.com/attachments/816934520837898244/987747322345701476/Activity.png"></img>
                <h2 className="text-17 font-600 ml-10 mt-4">Berita</h2>
              </div>
              <p className="fontTiny ml-8 my-5">
                Informasi mengenai COVID-19 dan vaksinasi
              </p>

              <div className="mt-10 ml-8 mb-32 flex flex-col">
                {dataBerita?.API_Berita.map((berita) => (
                  <CardBerita item={berita} loadCard={loadCard} setLoadCard={setLoadCard} />
                ))}
                <div className="lg:w-11/12 w-full mt-10">
                  <Button
                    style={{
                      backgroundColor: "rgba(2, 109, 225, 1)",
                      padding: "10px 20px",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      borderRadius: "10px",
                    }}
                    fullWidth
                    variant="contained"
                    endIcon={<ChevronRightIcon />}
                    href="/berita/AllBerita"
                    // onClick={() => setShowModalTambahVaksin(true)}
                  >
                    Tampilkan Lebih Banyak
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavBarList>
  );
}
