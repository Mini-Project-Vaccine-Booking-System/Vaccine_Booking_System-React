import React from 'react'
import {articles} from './data'
import Header from './Header'
import "../home.css"
import CardBerita from './cardBerita'

import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import { Axios } from "axios";
import { initialValue } from '../initialValue'
import NavBarList from "../../config/NavbarList";


function Berita() {
  const axios = require("axios");
  const location = useLocation()
  const { source, title, description, author, url, urlToImage, publishedAt, content} = location.state

  console.log(location.state)
  // console.log(publishedAt)

  // let day = publishedAt.getDate()

  // console.log("cek hari", day)

  // let day = publishedAt
  // day = day.substring(10, 8);
  // console.log(day)

  // let time = publishedAt
  // time = time.substring(16, 11);
  // console.log(time)

  const [dataBerita, setDataBerita] = useState(initialValue)

  useEffect(() => {
      axios.get("https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=2e9cc2af6e7047f0b24b169e656471fb").then((res) => {
          setDataBerita(res.data.articles)
          console.log(res.data.articles);
      })
      .catch((err) => {
          console.log(err);
          console.log("Data gak ketemu")
          // setError("Data gak ketemu")
      })

  }, []);

  return (
    <NavBarList>
      <div className='berita'>
      <p className='navigasi ml-10 mt-10'>Dashboard &#62; Berita &#62; <span className='font-semibold'>{title}</span></p>
      <div class="grid lg:grid-cols-4 grid-cols-1">
        <div class="flex flex-wrap col-span-3">
          <div class="p-10 flex flex-col items-start"> 
            <h5 class="text-gray-500 mt-5">{source.name} - {publishedAt}</h5> 
            <h2 class="font-bold sm:text-3xl text-xs title-font text-gray-900 mt-4 mb-4">{title}</h2>
            <h5 class="text-gray-500 mb-7" >Penulis : {author} | Editor : Unknown</h5>
            <img src={urlToImage}/>
            <p class="leading-relaxed mb-6 mt-10 max-w-md">{content.substring(0, 195)}.... Baca selengkapknya di <a href={url} target="_blank">{url}</a></p>
          </div> 
        </div>
        <div className=' lg:ml-12'>
          <div className="flex flex-row items-center">
            <img src="https://cdn.discordapp.com/attachments/816934520837898244/987747322345701476/Activity.png"></img>
            <h2 className="text-17 font-600 ml-10 mt-4 text-grey-700">Berita Terkait</h2>
          </div>
          <p className='fontTiny ml-8'>Berita lainnya mengenai kesehatan</p>
          <div className='mt-10 ml-8 mb-32 flex flex-col'>
          {dataBerita.slice(0, 4).map((berita) => <CardBerita item={berita}/>)}
            {/* <div 
              className="w-224 h-160 rounded-lg bg-cover bg-center z-0 mb-14 mr-10 lg:w-192 lg:h-112" 
              style={{
                backgroundImage: `url(${urlToImage})`
              }}
            >
              <div 
                className="w-224 h-160 rounded-lg z-10 p-7 lg:w-192 lg:h-112"
                style={{
                  background: "linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                }}
              >
                <h6 className="text-white text-11 font-500">test</h6>
                <p className="fontTiny text-white font-200">test</p>
              </div>
            </div>
            <div 
              className="w-224 h-160 rounded-lg bg-cover bg-center z-0 mb-14 mr-10 lg:w-192 lg:h-112" 
              style={{
                backgroundImage: `url(${urlToImage})`
              }}
            >
              <div 
                className="w-224 h-160 rounded-lg z-10 p-7 lg:w-192 lg:h-112"
                style={{
                  background: "linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                }}
              >
                <h6 className="text-white text-11 font-500">test</h6>
                <p className="fontTiny text-white font-200">test</p>
              </div>
            </div> */}

          </div>
        </div>
      </div>
      </div>
    </NavBarList>
  )
}

export default Berita