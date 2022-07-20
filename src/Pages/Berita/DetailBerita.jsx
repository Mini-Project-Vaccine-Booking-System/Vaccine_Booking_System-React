import React from 'react'
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import { Axios } from "axios";
import { Link } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";

import "../Home/home.css"
import CardBerita from '../../Components/CardBerita/cardBerita'
import NavBarList from '../../Components/Navbar/NavbarList';

const GetNews = gql `
  query MyQuery {
    API_Berita(limit: 4) {
      author
      content
      description
      id
      source
      title
      url
      urlToImage
      publishedAt
    }
  }
`


function Berita() {
  const axios = require("axios");
  const location = useLocation()
  const { source, title, description, author, url, urlToImage, publishedAt, content} = location.state

  const {data: dataBerita, loading, error} = useQuery(GetNews);

  // const [dataBerita, setDataBerita] = useState([])

  // useEffect(() => {
  //     axios.get(process.env.REACT_APP_NEWS_API).then((res) => {
  //         setDataBerita(res.data.articles)
  //         console.log(res.data.articles);
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //         console.log("Data gak ketemu")
  //         // setError("Data gak ketemu")
  //     })

  // }, []);

  return (
    <NavBarList>
      <div className='berita'>
      <p className='navigasi ml-10 mt-10'><Link to="/">Dashboard &#62; </Link><Link to="/berita/AllBerita">Berita &#62; </Link><span className='font-semibold'>{title.substring(0, 25)}...</span></p>
      <div class="grid lg:grid-cols-4 grid-cols-1">
        <div class="flex flex-wrap col-span-3">
          <div class="p-10 flex flex-col items-start"> 
            <h5 class="text-gray-500 mt-5 text-9">{source} - {publishedAt}</h5> 
            <h2 class="font-bold sm:text-3xl text-xs title-font text-gray-900 mt-4 mb-4">{title}</h2>
            <h5 class="text-gray-500 mb-7" >Penulis : {author} | Editor : Unknown</h5>
            <img src={urlToImage}/>
            <p class="leading-relaxed mb-6 mt-10 max-w-md">{content.substring(0, 400)}.... <br></br> Baca selengkapknya di <a href={url} target="_blank"><span className='font-500 underline'>{url}</span></a></p>
          </div> 
        </div>
        <div className=' lg:ml-12'>
          <div className="flex flex-row items-center">
            <img src="https://cdn.discordapp.com/attachments/816934520837898244/987747322345701476/Activity.png"></img>
            <h2 className="text-17 font-600 ml-10 mt-4 text-grey-700">Berita Terkait</h2>
          </div>
          <p className='fontTiny ml-8'>Berita lainnya mengenai kesehatan</p>
          <div className='mt-10 ml-8 mb-32 flex flex-col'>
          {dataBerita?.API_Berita?.map((berita) => <CardBerita key={berita.id} item={berita}/>)}
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