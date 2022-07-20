import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import StepButton from "@mui/material/StepButton";
import { Container } from "@mui/material";

import { TanggalVaksin } from "../../Components/ContainerInputSesiTanggal/TanggalVaksin"
import { FormTiketVaksin } from "../../Components/ContainerInputSesiVaksin/FormTiketVaksin"
import { KonfirmasiDataTiket } from "../../Components/ContainerKonfirmasiSesiVaksin/KonfirmasiDataTiket"
import { TiketVaksinBerhasil } from "../../Components/ContainerSesiBerhasil/TiketVaksinBerhasil";
import NavBarList from '../../Components/Navbar/NavbarList';

function getSteps() {
  return [
    "Atur Tanggal Vaksin",
    "Atur Jenis Vaksin",
    "Konfirmasi Data Tiket",
    "Tiket Vaksin Berhasil",
  ];
}

export const AturTiketVaksin = (props) => {

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TanggalVaksin
            handleChangeTanggal={handleChangeTanggal}
            handleChangeWaktuAwal={handleChangeWaktuAwal}
            handleChangeWaktuAkhir={handleChangeWaktuAkhir}
            errorMessage={errorWaktu}
          />
        );
      case 1:
        return (
          <FormTiketVaksin
            dataVaksin={dataVaksin}
            handleChangeVaksin1={handleChangeVaksin1}
            errorMessage={errorStok}
          />
        );
      case 2:
        return (
          <KonfirmasiDataTiket
            tanggal={tanggal}
            waktuAwal={waktuAwal}
            waktuAkhir={waktuAkhir}
            vaksin={dataKonfirmVaksin.nama}
            vaksin1={vaksin1}
            kirim ={handleSubmit}
          />
        );
      case 3:
        return <TiketVaksinBerhasil />;
      default:
        return "tidak di ketahui";
    }
  }

  // =========FUNCTION ATUR TANGGAL VAKSIN===============

  const [tanggal, setTanggal] = useState("");
  const [waktuAwal, setWaktuAwal] = useState("");
  const [waktuAkhir, setWaktuAkhir] = useState("");
  const [errorWaktu, setErrorWaktu] = useState("");

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
    if(e.target.value <= waktuAwal) {
      setErrorWaktu("Waktu Invalid")
      setWaktuAkhir(e.target.value);
    } else if (e.target.value >= waktuAwal) {
      setErrorWaktu("")
      setWaktuAkhir(e.target.value);
    }
  };

  // console.log("cek tanggal", tanggal);
  // console.log("cek waktu awal", waktuAwal);
  // console.log("cek waktu akhir", waktuAkhir);

  // =====================================================
  // =========FUNCTION ATUR JENIS VAKSIN==================

  const [dataVaksin, setDataVaksin] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(API_URL+`/vaksin/user/${Cookies.get('id')}`)
      .then((res) => {
        setDataVaksin(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
        // console.log("Data Pokemen gak ketemu");
        setError("Data Pokemen gak ketemu");
      });
  }, []);

  const [errorStok, setErrorStok] = useState("");
  const [vaksin1, setVaksin1] = useState({
    // idVaksin : null,
    vaksin1: "",
    stokVaksin1: "",
  });
  
  const API_URL = process.env.REACT_APP_BASE_URL
  const [dataKonfirmVaksin, setDataKonfirmVaksin] = useState([])
  const handleChangeVaksin1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;


    if (e.target.value > 100 || e.target.value < 5) {
      setErrorStok("Stok per-sesi min 5 dan max 100")
      setVaksin1({
        ...vaksin1,
        [name]: value,
      });
    } else {
      setErrorStok("")
      setVaksin1({
        ...vaksin1,
        [name]: value,
      });
    }

      axios.get(API_URL+`/vaksin/${vaksin1.vaksin1}`).then((res) => {
        setDataKonfirmVaksin(res.data.data)
        console.log(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
        console.log("Data gak ketemu")
        // setError("Data gak ketemu")
      })
    };

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
    // const newCompleted = completed;
    // newCompleted[activeStep] = [activeStep -1];
    // setCompleted(newCompleted);
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

  // ===========KONFIRMASI DATA TIKET====================

  const navigate = useNavigate();
  const handleSubmit = (e) => {

    const sesiData = {
      id_health: Cookies.get('id'),
      date: tanggal,
      start: waktuAwal + ":00",
      end: waktuAkhir + ":00",
      nama: dataKonfirmVaksin.nama,
      stok: vaksin1.stokVaksin1,
      // stok_vaksin1: props.vaksin1.stokVaksin1,
    };
    // console.log(sesiData, "sesiData")

    if (tanggal == "" || vaksin1.vaksin1 == "" || vaksin1.stokVaksin1 == "" || waktuAwal == "" || waktuAkhir == "") {
      toast.error("Data GAGAL ditambahkan, harap lengkapi data")
    } else if (waktuAkhir <= waktuAwal) {
      toast.error("Data GAGAL ditambahkan, harap perbaiki data")
    } else if (vaksin1.stokVaksin1 > 100 || vaksin1.stokVaksin1 < 5) {
      toast.error("Data GAGAL ditambahkan, harap perbaiki data")
    } else {
        axios
          .post(API_URL+`/session`, sesiData, {
            headers: {
              'Authorization' : `Bearer ${Cookies.get('jwt')}`
            }
          })
          .then((response) => {
            console.log(response.status);
            console.log(response.data.token);
    
            if (response.status === 200) {
              handleComplete();
              toast.success("Data BERHASIL ditambahkan");
            } else {
              toast.error("Data GAGAL ditambahkan");
            }
          });

          const manageStokVaksin = {
            id_health: Cookies.get('id'),
            nama: dataKonfirmVaksin.nama,
            quantity: parseInt(dataKonfirmVaksin.quantity) - parseInt(vaksin1.stokVaksin1)
          }
          axios
            .put(
              API_URL+`/vaksin/${dataKonfirmVaksin.idVaksin}`,
              manageStokVaksin, {
                headers: {
                  'Authorization' : `Bearer ${Cookies.get('jwt')}`
                }
              }
            )
            .then((response) => {
              console.log(response.status);
            }
          );

          // const manageStokVaksin = {
          //   id_health: dataDelete.vaksin.user.idUser,
          //   nama: dataDelete.vaksin.nama,
          //   quantity: parseInt(dataDelete.vaksin.quantity) + parseInt(dataDelete.stok)
          // }
          // axios
          //   .put(
          //     API_URL+`/vaksin/${dataDelete.vaksin.idVaksin}`,
          //     manageStokVaksin
          //   )
          //   .then((response) => {
          //     console.log(response.status);
          //   }
          // );
    
        // setTimeout(() => {
        //   navigate("/fitur/sesiTersedia");
        // }, 3000);
    }  
  };

  // =================================================================


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
                {/* {allStepsCompleted() ? ( */}
                {activeStep == 3 ? (
                  <div className="mx-auto">
                    <div className="flex flex-col">
                      <TiketVaksinBerhasil handleReset={handleReset} />
                      {/* <Button onClick={handleReset}>Reset</Button> */}
                    </div>
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
                            {/* {completedSteps() === totalSteps() - 1 ? ( */}
                            {activeStep === 2 ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  handleSubmit()
                                }}
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
