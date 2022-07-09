import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NavBarList from '../../config/NavbarList';
import { MdArrowRightAlt } from "react-icons/md";
import { BsArrowRight } from 'react-icons/bs';
import {MdKeyboardArrowRight} from "react-icons/md";
import "../home.css"
import { Link } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";

const GetNews = gql `
  query MyQuery {
    API_Berita {
      author
      content
      description
      id
      source
      title
      url
      urlToImage
    }
  }
`

export default function AllBerita() {

  const {data: dataBerita, loading, error} = useQuery(GetNews);
  // const [news, setNews] = useState([]);

  // useEffect(() => {
  //   const loadNews = async () => {
  //     const response = await axios.get(
  //       process.env.REACT_APP_NEWS_API
  //     );
  //     setNews(response.data.articles);
  //   };
  //   loadNews();
  // }, []);

  // console.log("news", news);

  return (
    <NavBarList>
      <div>
      <p className='navigasi ml-14 mt-12'><Link to="/">Dashboard &#62; </Link><span className='font-semibold'>Berita</span></p>
        <h1 class="p-8 mt-12 mx-14 rounded-lg bg-blue-400 text-white text-center text-xs font-semibold">Berita COVID-19 dan Vaksinasi Terkini</h1>
      </div>
      <div class="flex justify-center flex-col mt-20">
        {dataBerita?.API_Berita?.map((item) => (
          <div class="grid lg:grid-cols-5 grid-cols-2 mt-2 mx-14 mb-14 p-8 rounded-md allBerita shadow-lg">
              <img class="rounded-lg mb-5" src={item.urlToImage} alt="" />
              <div class="lg:ml-8 lg:col-span-4 col-span-2">
                <div>
                  <p class="text-gray-600 fontTiny">Vaksinasi</p>
                  <h5 class="text-gray-900 text-sm mb-5 font-600"> {item.title}</h5>
                  <p class="text-gray-600 text-10">{item.content}</p>  
                </div>
                <a href={item.url} target="_blank">
                  <div className='flex flex-row-reverse items-center mt-20'>
                    <BsArrowRight 
                      className='text-blue-400'
                      size="18px"/>
                    <p class=" text-blue-400 hover:text-blue-500 mr-5 transition duration-300 ease-in-out">
                    Baca selengkapnya
                    </p>   
                  </div>
                </a>
              </div>
          </div>
        ))}
      </div>
    </NavBarList>
  )
}
