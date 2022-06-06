import React, { useState } from "react";
import Chart from "react-apexcharts";

export const JumlahVaksinRS = (props) => {
  const [grafik, setGrafik] = useState({
    chart: {
      id: "apexcharts-example",
    },
    xaxis: {
      categories: [
        "RS. MULANA",
        "RS. HAVINA",
        "RS. TANGERANG",
        "RS. KASIH SAYANG",
        "RS. TERSAKITI",
        "RS. BALIK PAPAN",
        "RS. DEPOK",
        "RS. INDONESIA",
        "RS. CISAUK",
      ],
    },
    fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
  });
  const [series, setSeries] = useState([
    {
      name: "Data Vaksin",
      data: [40, 70, 35, 50, 49, 91, 125, 202, 205]
    },
  ]);
  return (
    <React.Fragment>
      <div>
        <Chart
          options={grafik}
          series={series}
        //   type="histogram"
          type="area"
          width={1000}
          height={500}
        />
      </div>
    </React.Fragment>
  );
};
