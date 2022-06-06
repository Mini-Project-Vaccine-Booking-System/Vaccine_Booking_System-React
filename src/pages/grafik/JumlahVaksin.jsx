import React, { useState } from "react";
import Chart from "react-apexcharts";

export const JumlahVaksin = (props) => {
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
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 202, 205],
    },
  ]);
  return (
    <React.Fragment>
      <div>
        <Chart
          options={grafik}
          series={series}
          type="bar"
          width={1000}
          height={500}
        />
      </div>
    </React.Fragment>
  );
};
