import React, { useState, useEffect, useContext } from "react";
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
import StepButton from "@mui/material/StepButton";
import { TanggalVaksin } from "./TanggalVaksin";
import { TiketVaksinBerhasil } from "./TiketVaksinBerhasil";
import { Container } from "@mui/material";
import NavBarList from "../../../config/NavbarList";
import axios from "axios";
import { KonfirmasiDataTiket } from "./KonfirmasiDataTiket";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function getSteps() {
  return [
    "Atur Tanggal Vaksin",
    "Atur Jenis Vaksin",
    "Konfirmasi Data Tiket",
    // "Tiket Vaksin Berhasil",
  ];
}

export const AturTiketVaksin = (props) => {

  // const kirim = useContext(UserContext); 
  // console.log(kirim,"kirim")

  console.log("props AturTiketVkasin", props);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TanggalVaksin
            handleChangeTanggal={handleChangeTanggal}
            handleChangeWaktuAwal={handleChangeWaktuAwal}
            handleChangeWaktuAkhir={handleChangeWaktuAkhir}
          />
        );
      case 1:
        return (
          <FormTiketVaksin
            dataVaksin={dataVaksin}
            handleChangeVaksin1={handleChangeVaksin1}
          />
        );
      case 2:
        return (
          <KonfirmasiDataTiket
            tanggal={tanggal}
            waktuAwal={waktuAwal}
            waktuAkhir={waktuAkhir}
            vaksin1={vaksin1}
            kirim ={handleSubmit}
          />
        );
      // case 3:
      //   return <TiketVaksinBerhasil  />;
      default:
        return "tidak di ketahui";
    }
  }

  // =========FUNCTION ATUR TANGGAL VAKSIN===============

  const [tanggal, setTanggal] = useState("");
  const [waktuAwal, setWaktuAwal] = useState("");
  const [waktuAkhir, setWaktuAkhir] = useState("");

  const handleChangeTanggal = (e) => {
    // console.log("di etarget", e.target.value)
    setTanggal(e.target.value);
  };
  const handleChangeWaktuAwal = (e) => {
    // console.log("di etarget", e.target.value)
    setWaktuAwal(e.target.value);
  };

  const handleChangeWaktuAkhir = (e) => {
    // console.log("di etarget", e.target.value)
    setWaktuAkhir(e.target.value);
  };

  console.log("cek tanggal", tanggal);
  console.log("cek waktu awal", waktuAwal);
  console.log("cek waktu akhir", waktuAkhir);

  // =====================================================
  // =========FUNCTION ATUR JENIS VAKSIN==================

  const [dataVaksin, setDataVaksin] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("https://booking-vaksin-alta.herokuapp.com/api/vaksin/user/14")
      .then((res) => {
        setDataVaksin(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Data Pokemen gak ketemu");
        setError("Data Pokemen gak ketemu");
      });
  }, []);

  const [vaksin1, setVaksin1] = useState({
    vaksin1: "",
    stokVaksin1: "",
  });

  const handleChangeVaksin1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVaksin1({
      ...vaksin1,
      [name]: value,
    });
  };
  console.log("cek vaksin 1", vaksin1);

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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(tanggal,"waktu awal")
    // e.preventDefault();
    const sesiData = {
      id_health: 14,
      date: tanggal,
      start: waktuAwal + ":00",
      end: waktuAkhir + ":00",
      nama: vaksin1.vaksin1,
      stok: vaksin1.stokVaksin1,
      // stok_vaksin1: props.vaksin1.stokVaksin1,
    };
    console.log(sesiData, "sesiData")
    axios
      .post("https://booking-vaksin-alta.herokuapp.com/api/session", sesiData)
      .then((response) => {
        console.log(response.status);
        console.log(response.data.token);

        if (response.status === 200) {
          toast.success("Data BERHASIL ditambahkan");
        } else {
          toast.error("Data GAGAL ditambahkan");
        }
      });

    setTimeout(() => {
      navigate("/fitur/sesiTersedia");
    }, 1800);
  };


  return (
    // <UserContext.Consumer>
      <NavBarList>
        <Container className=" w-full text-right pt-32">
          <div className="mt-5 ">
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
                    <div className="flex items-end justify-end mt-40">
                      <div className="flex justify-center">
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Kembali
                        </Button>
                      </div>
                      {activeStep !== steps.length &&
                        (completed[activeStep === steps.length] ? (
                          `Sudah Selesai`
                        ) : (
                          <div>
                            {completedSteps() === totalSteps() - 1 ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                              >
                                Kirim
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleComplete}
                              >
                                Selanjutnya
                              </Button>
                            )}
                          </div>
                          // <div>
                          //   <Button
                          //     variant="contained"
                          //     color="primary"
                          //     onClick={handleComplete}
                          //   >
                          //     {completedSteps() === totalSteps() - 1
                          //       ? "Kirim"
                          //       : "Selanjutnyaa"}
                          //   </Button>
                          // </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </NavBarList>
  //  </UserContext.Consumer>
  );
};
