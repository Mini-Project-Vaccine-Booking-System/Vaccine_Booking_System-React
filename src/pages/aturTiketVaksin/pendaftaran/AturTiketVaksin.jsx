import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { JenisVaksin } from "./JenisVaksin";
import { FormTiketVaksin } from "./FormTiketVaksin";
import { KonfirmasiDataTiket } from "./KonfirmasiDataTiket";
import StepButton from "@mui/material/StepButton";
import { TanggalVaksin } from "./TanggalVaksin";
import { TiketVaksinBerhasil } from "./TiketVaksinBerhasil";
import { Container } from "@mui/material";

function getSteps() {
  return [
    "Atur Tanggal Vaksin",
    "Atur Jenis Vaksin",
    "Konfirmasi Data Tiket",
    "Tiket Vaksin Berhasil",
  ];
}

export const AturTiketVaksin = () => {

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <TanggalVaksin 
          handleChangeWaktuAwal={handleChangeWaktuAwal} 
          handleChangeWaktuAkhir={handleChangeWaktuAkhir}/>;
      case 1:
        return <FormTiketVaksin 
          vaksin={vaksin}
          handleChangeVaksin1={handleChangeVaksin1}
          handleChangeVaksin2={handleChangeVaksin2}/>;
      case 2:
        return <KonfirmasiDataTiket 
          waktuAwal={waktuAwal}
          waktuAkhir={waktuAkhir}
          vaksin1={vaksin1}
          vaksin2={vaksin2}/>;
      case 3:
        return <TiketVaksinBerhasil />;
      default:
        return "tidak di ketahui";
    }
  }

  // =========FUNCTION ATUR TANGGAL VAKSIN===============

  const [waktuAwal, setWaktuAwal] = useState("");
  const [waktuAkhir, setWaktuAkhir] = useState("");

  const handleChangeWaktuAwal = (e) => {
    // console.log("di etarget", e.target.value)
    setWaktuAwal(e.target.value);
  };

  const handleChangeWaktuAkhir = (e) => {
    // console.log("di etarget", e.target.value)
    setWaktuAkhir(e.target.value);
  };

  console.log("cek waktu awal", waktuAwal)
  console.log("cek waktu akhir", waktuAkhir)

  // =====================================================
  // =========FUNCTION ATUR JENIS VAKSIN==================

  const vaksin = [
    'Sinovac',
    'Pfizer',
    'Moderna',
    'AstraZeneca'
  ]

  const [vaksin1, setVaksin1] = useState({
    vaksin1: "",
    stokVaksin1: ""
  })
  
  const [vaksin2, setVaksin2] = useState({
    vaksin2: "",
    stokVaksin2: ""
  })

  const handleChangeVaksin1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVaksin1({
      ...vaksin1, [name]: value
    })
  }
  console.log("cek vaksin 1", vaksin1)


  const handleChangeVaksin2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVaksin2({
      ...vaksin2, [name]: value
    })
  }
  console.log("cek vaksin 2", vaksin2)

  // =====================================================

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Container className=" w-full text-right mt-32">
      <div className="h-screen mt-5 ">
        <div className="text-center">
          <Box className="">
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={completed[index]}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
        <div className="p-10 text-center flex justify-center">
          <div className="flex content-end w-full">
            {allStepsCompleted() ? (
              <div>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div className=" w-full p-10">
                <div>{getStepContent(activeStep)}</div>
                <div className="flex items-end justify-end mt-80">
                  <div className="flex justify-center">
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Kembali
                    </Button>
                  </div>
                  {activeStep !== steps.length &&
                    (completed[activeStep === steps.length] ? (
                      `Sudah Selesai`
                    ) : (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleComplete}
                        >
                          {completedSteps() === totalSteps() - 1
                            ? "Kirim"
                            : "Selanjutnyaa"}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
