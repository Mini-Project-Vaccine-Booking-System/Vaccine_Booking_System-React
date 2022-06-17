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
function getStepContent(step) {
  switch (step) {
    case 0:
      return <TanggalVaksin />;
    case 1:
      return <FormTiketVaksin />;
    case 2:
      return <KonfirmasiDataTiket />;
    case 3:
      return <TiketVaksinBerhasil />;
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
    <Container className=" w-full text-right ">
      <div className="p- h-screen mt-5">
        <div className="text-center">
          <Box>
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
          {/* <h1>Atur Tanggal Vaksin</h1> */}
          <div className="flex content-end">
            {allStepsCompleted() ? (
              <div>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div className=" w-512 h-208 ">
                <div>{getStepContent(activeStep)}</div>
                <div className="flex items-end justify-end pt-113">
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
