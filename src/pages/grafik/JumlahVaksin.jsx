import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export const JumlahVaksin = (props) => {

  const [dataUser, setDataUser] = useState([])
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        console.log("response", response)
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
    <React.Fragment>
      <div>
        <Chart
          options={options}
          series={series}
          type="treemap"
          width={1000}
          height={500}
        />
      </div>
    </React.Fragment>
  );
};
