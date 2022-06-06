import React, { useState } from "react";
import Chart from "react-apexcharts";

export const JumlahPaparanCovid = (props) => {
  const [grafik, setGrafik] = useState({
    chart: {
      id: "apexcharts-example",
    },
    xaxis: {
      categories: [
        "jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agust",
        "Sept",
        "Nov",
        "Des",
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Data Vaksin",
      data: [40, 70, 35, 50, 49, 60, 70, 91, 125, 202, 205]
    },
  ]);
  return (
    <React.Fragment>
      <div>
        <Chart
          options={grafik}
          series={series}
          type="line"
          width={1000}
          height={500}
        />
      </div>
    </React.Fragment>
  );
};
