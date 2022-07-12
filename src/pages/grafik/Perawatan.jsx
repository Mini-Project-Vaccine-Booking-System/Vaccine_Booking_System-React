import React, { useState } from "react";
import Chart from "react-apexcharts";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "../home.css"

export const Perawatan = (props) => {

  return (
    <div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            
          >
            <Typography>Isolasi Mandiri</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Setelah terpapar ke orang yang terinfeksi COVID-19, lakukan tindakan berikut :</p>
              <ul className="list-disc ml-14">
                <li>Hubungi penyedia layanan kesehatan atau hotline COVID-19 untuk mendapatkan informasi terkait tempat dan waktu untuk menjalani tes.</li>
                <li>Taati prosedur pelacakan kontak untuk menghentikan penyebaran virus.</li>
                <li>Jika tes tidak tersedia, tetaplah di rumah dan jangan lakukan kontak dengan orang lain selama 14 hari.</li>
                <li>Selama masa karantina, jangan pergi ke kantor, sekolah, atau tempat-tempat umum. Mintalah seseorang mencukupi kebutuhan Anda.</li>
                <li>Jaga jarak minimal 1 meter dari orang lain, termasuk anggota keluarga Anda.</li>
                <li>Kenakan masker medis untuk melindungi orang lain, termasuk jika/ketika Anda perlu meminta perawatan medis.</li>
                <li>Cuci tangan Anda secara rutin.</li>
                <li>Gunakan ruangan yang terpisah dari anggota keluarga lain, dan jika tidak memungkinkan, selalu kenakan masker medis.</li>
                <li>Pastikan ventilasi ruangan selalu baik.</li>
                <li>Jika menggunakan kamar bersama orang lain, beri jarak antar-tempat tidur minimal 1 meter.</li>
                <li>Amati diri Anda sendiri apakah ada gejala apa pun selama 14 hari.</li>
                <li>Segera hubungi penyedia layanan kesehatan jika Anda mengalami salah satu tanda bahaya berikut: sulit bernapas, sulit berbicara atau bergerak, bingung, atau merasakan nyeri di dada.</li>
                <li>Tetaplah positif dengan terus berinteraksi dengan orang-orang terdekat melalui telepon atau internet, dan dengan berolahraga di rumah.</li>
              </ul><br></br>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Terapi Medis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>Ilmuwan dari seluruh dunia tengah berupaya menemukan dan mengembangkan obat untuk COVID-19.</p><br></br>
              <ul className="list-disc ml-14">
                <li>Perawatan pendukung yang optimal meliputi pemberian oksigen bagi pasien yang sakit parah dan berisiko mengalami sakit parah, serta alat bantu pernapasan canggih, seperti ventilator, bagi pasien yang sakit kritis.</li>
                <li>Dexamethasone adalah kortikosteroid yang dapat membantu mengurangi durasi penggunaan ventilator dan menyelamatkan nyawa pasien yang sakit parah dan kritis.</li>
              </ul><br></br>
              <p>WHO tidak merekomendasikan perawatan mandiri dengan obat apa pun, termasuk antibiotik, sebagai pencegahan atau pengobatan untuk COVID-19.</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )


  // return (
  //   <React.Fragment>
  //     <div>
  //       <Chart
  //         options={grafik}
  //         series={series}
  //         type="line"
  //         width={1000}
  //         height={500}
  //       />
  //     </div>
  //   </React.Fragment>
  // );
};
