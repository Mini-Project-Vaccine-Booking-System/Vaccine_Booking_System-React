import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const Gejala = (props) => {

  const [dataUser, setDataUser] = useState([])
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        // console.log("response", response)
        setDataUser(response.data)
      }).catch(e => {
        alert(e);
      })
  }, [])

  const seriesData = [];
  const options = {};

  
  dataUser.map((val) => {
    seriesData.push(
      {
        x: val.id,  
        y: val.postId  
      }
      );
    });
    const series = [{ data: seriesData }];

  // useEffect(() => {
  //   const id = [];
  //   const postId = [];
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos')
  //     .then((response) => {
  //       console.log("res", response);
  //       response.data.map((item) => {
  //         console.log("item", item);
  //         id.push(item.id);
  //         postId.push(item.postId);
  //       });
  //       setGrafik({
  //         chart: {
  //           id: "apexcharts-example",
  //         },
  //         xaxis: {
  //           categories: id,
  //         },
  //       });
  //       setSeries({
  //         name: "Data Vaksin",
  //         data: postId,
  //       });
  //       console.log("id", id)
  //     })
  //     .catch((error) => {
  //       alert(error);
  //       console.log("err", error);
  //     });
  // },[]);


  return (
    <div>
      <div className="">
        <p>Masing-masing orang memiliki respons yang berbeda terhadap COVID-19. Sebagian besar orang yang terpapar virus ini akan mengalami gejala ringan hingga sedang, dan akan pulih tanpa perlu dirawat di rumah sakit.</p><br></br>
        <p>Gejala yang paling umum :</p>
        <ul className="list-disc ml-14">
          <li>Demam</li>
          <li>Batuk</li>
          <li>Kelelahan</li>
          <li>Kehilangan Rasa atau Bau</li>
        </ul><br></br>

        <p>Gejala yang sedikit tidak umum :</p>
        <ul className="list-disc ml-14">
          <li>Sakit Tenggorokan</li>
          <li>Sakit Kepala</li>
          <li>Sakit dan Nyeri</li>
          <li>Diare</li>
          <li>Ruam pada Kulit, atau perubahan warna pada jari tangan atau jari kaki</li>
          <li>Mata Merah atau Iritasi</li>
        </ul><br></br>

        <p>Gejala Serius :</p>
        <ul className="list-disc ml-14">
          <li>Kesulitan bernapas atau sesak napas</li>
          <li>Kesulitan berbicara atau bergerak, atau bingung</li>
          <li>Nyeri Dada</li>
        </ul><br></br>

        <p>Segera cari bantuan medis jika Anda mengalami gejala serius. Selalu hubungi dokter atau fasilitas kesehatan sebelum mengunjunginya. Orang dengan gejala ringan yang dinyatakan sehat harus melakukan perawatan mandiri di rumah. Rata-rata gejala akan muncul 5–6 hari setelah seseorang pertama kali terinfeksi virus ini, tetapi bisa juga sampai 14 hari setelah terinfeksi.</p>

      </div>
    </div>
  )



  // return (
  //   <React.Fragment>
  //     <div>
  //       <Chart
  //         options={options}
  //         series={series}
  //         type="treemap"
  //         width={1000}
  //         height={500}
  //       />
  //     </div>
  //   </React.Fragment>
  // );

};
