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
import StepButton from '@mui/material/StepButton';
import { TanggalVaksin } from "./TanggalVaksin";

function getSteps() {
  return [
    "Atur Tanggal Vaksin",
    "Atur Jenis Vaksin",
    "Isi Formulir",
    "Konfirmasi Data Tiket",
  ];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <TanggalVaksin />;
    case 1:
      return <FormTiketVaksin />;
    case 2:
      return "apa";
    case 3:
      return <KonfirmasiDataTiket />;
    default:
      return "tidak di ketahui";
  }
}

export const AturTiketVaksin = () => {
  // const [tanggalAwal, setTanggalAwal] = usestate();
  // const [tanggalAkhir, setTanggalAkhir] = usestate();

  // const FORMAT = "yyyy/MM/dd"

  // const handleSubmit = () => console.log(textValue);
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
    <React.Fragment className="flex justify-center">
      <Paper elevation={3} className="h-full w-full">
        <div className="p-5 container">
          <div className="text-center">
            <Box sx={{ width: "100%" }}>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
              >
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
          <div className="p-10 text-center">
            <h1>Atur Tanggal Vaksin</h1>
            <div className="flex content-end">
              {allStepsCompleted() ? (
                <div>
                  Selesai
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  {getStepContent(activeStep)}
                  <div className="flex justify-end">
                    <div>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Kembali
                      </Button>
                    </div>
                    <div>
                      {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        Selanjutnya
                      </Button> */}
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          `Sudah Selesai`
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleComplete}
                          >
                            {completedSteps() === totalSteps() - 1
                              ? "Kirim"
                              : "Selanjutnya"}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};
