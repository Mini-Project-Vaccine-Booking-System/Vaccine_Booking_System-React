import React, { useState } from "react";
import "../../Pages/Home/home.css"

export const Pencegahan = (props) => {

  return (
    <div>
      <div className="bg-white w-full h-360 drop-shadow-xl rounded-lg p-8">
        <p className="fontTiny text-grey-700">Pengumuman Layanan Masyarakat</p>
        <div className="flex flex-col mt-28">
          <div className="mx-auto">
            <img src="https://cdn.discordapp.com/attachments/816934520837898244/989023194012876882/Mask_group.png"></img>
          </div>
          <div className="mx-auto mt-12">
            <h6 className="text-13 font-600 mb-5">Cegah COVID dan Bantu Akhiri Pandemi</h6>
            <p>Dengan : </p>
            <ul className="list-disc ml-14">
              <li>Pakai Masker</li>
              <li>Cuci Tangan</li>
              <li>Jaga Jarak dan Batasi Mobilitas</li>
              <li>Lakukan Vaksinasi</li>
            </ul>
          </div>
          <p className="mx-auto mt-40">Didukung oleh : </p>
          <div className="mx-auto mt-5">
            <div className="flex flex-row justify-center gap-12">
              <img src="https://cdn.discordapp.com/attachments/816934520837898244/989028177714217070/image_8.png"></img>
              <img src="https://cdn.discordapp.com/attachments/816934520837898244/989028177982681108/image_9.png"></img>
              <img src="https://cdn.discordapp.com/attachments/816934520837898244/989028178175598592/image_10.png"></img>
              <img src="https://cdn.discordapp.com/attachments/816934520837898244/989028178389520434/image_11.png"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )


  // return (
  //   <React.Fragment>
  //     <div>
  //       <Chart
  //         options={grafik}
  //         series={series}
  //       //   type="histogram"
  //         type="area"
  //         width={1000}
  //         height={500}
  //       />
  //     </div>
  //   </React.Fragment>
  // );
};
