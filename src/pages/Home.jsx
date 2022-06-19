import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { JumlahVaksin } from "./grafik/JumlahVaksin";
import { JumlahPaparanCovid } from "./grafik/JumlahPaparanCovid";
import { JumlahVaksinRS } from "./grafik/JumlahVaksinRS";

import "./home.css"

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

export default function Home(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props);
  return (
    <div className="home">
      <div className="ml-5 mt-5 ">

        <div className="grid lg:grid-cols-3 gap-x-2.5 grid-cols-1">
          <div className="col-span-2">
            <p className='navigasi'><span className='font-semibold '>Dashboard</span></p>
            <h1 className="text-2xl font-bold mb-10">Dashboard</h1>
            <p className="font-semibold text-gray-600 mb-10">Perkembangan COVID-19 Hari ini di Indonesia</p>
            <div className="flex flex-row flex-wrap justify-evenly mb-10">
              <div class="flex justify-center mb-10">
                <div class="rounded-lg shadow-lg w-136 cardPositifCovid">
                  <a href="#!">
                    <img class="mx-auto mt-10" src="https://cdn.discordapp.com/attachments/816934520837898244/987690227206344714/Group_28.png" alt=""/>
                  </a>
                  <div class="p-6 mx-auto">
                    <h5 class="text-white text-10 font-300 text-center">Positif COVID</h5>
                    <p class="text-white text-sm font-600 text-center">
                      1.234.532
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex justify-center mb-10">
                <div class="rounded-lg shadow-lg w-136 cardSembuh">
                  <a href="#!">
                    <img class="mx-auto mt-10" src="https://cdn.discordapp.com/attachments/816934520837898244/987690227697082408/Group_52.png" alt=""/>
                  </a>
                  <div class="p-6 mx-auto">
                    <h5 class="text-white text-10 font-300 text-center">Sembuh</h5>
                    <p class="text-white text-sm font-600 text-center">
                      1.234.532
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex justify-center mb-10">
                <div class="rounded-lg shadow-lg w-136 cardMeninggal">
                  <a href="#!">
                    <img class="mx-auto mt-10" src="https://cdn.discordapp.com/attachments/816934520837898244/987690228015853639/Group_16.png" alt=""/>
                  </a>
                  <div class="p-6 mx-auto">
                    <h5 class="text-white text-10 font-300 text-center">Meninggal</h5>
                    <p class="text-white text-sm font-600 text-center">
                      1.234.532
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <img src="https://cdn.discordapp.com/attachments/816934520837898244/987747322345701476/Activity.png"></img>
              <h2 className="text-17 font-600 ml-10 mt-4">Statistik Perkembangan COVID-19</h2>
            </div>
              <p className="fontTiny ml-8 my-5">Statistik Covid-19 di Indonesia dalam satu minggu terakhir</p>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Data Vaksin" {...a11yProps(0)} />
                  <Tab label="Peningkatan paparan Covid" {...a11yProps(1)} />
                  <Tab label="Jumlah VaksinQu" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <JumlahVaksin />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <JumlahPaparanCovid />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <JumlahVaksinRS/>
              </TabPanel>
            </Box>
          </div>
          <div className="bg-red-300 h-56"> Nanti ini untuk berita</div>
        </div>

        
      </div>
    </div>
  );
}
