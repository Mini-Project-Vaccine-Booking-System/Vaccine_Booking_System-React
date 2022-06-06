import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const steps = [
  "Atur Tanggal Vaksin",
  "Atur Jenis Vaksin",
  "Isi Formulir",
  "Konfirmasi Data Tiket",
];

export const AturTiketVaksin = () => {
  // const [tanggalAwal, setTanggalAwal] = usestate();
  // const [tanggalAkhir, setTanggalAkhir] = usestate();

  // const FORMAT = "yyyy/MM/dd"

  // const handleSubmit = () => console.log(textValue);

  
  return (
    <React.Fragment className="flex justify-center">
      <Paper elevation={3}>
        <div className="p-5">
          <div className="text-center">
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={0} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <div className="p-10 text-center">
            <h1>Atur Tanggal Vaksin</h1>
            <div className="p-5">
              <TextField
                id="date"
                label="Masukan Tanggal Awal"
                type="date"
                defaultValue="2022-05-06"
                // value={tanggalAwal}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                // onChange={handleSubmit}
              />
            </div>
            <div className="p-5">
              <TextField
                id="date"
                label="Masukan Tanggal Awal"
                type="date"
                defaultValue="2022-05-06"
                // value={tanggalAkhir}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="contained">Selanjutnya</Button>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};
