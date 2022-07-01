import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NavBarList from '../../config/NavbarList';
import { MdArrowRightAlt } from "react-icons/md";
import {MdKeyboardArrowRight} from "react-icons/md";

export default function AllBerita() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=2e9cc2af6e7047f0b24b169e656471fb"
      );
      setNews(response.data.articles);
    };
    loadNews();
  }, []);

  console.log("news", news);

  return (
    <NavBarList>
    <div>
    <a class="mt-80 ml-14 text-gray-600" href="/">Dashboard</a> Berita
      <h1 class="p-8 max-w-md mt-12 mx-14 rounded-lg bg-blue-400 text-white text-center text-xs font-semibold">Berita COVID-19 dan Vaksinasi Terkini</h1>
      </div>
    <div class="flex justify-center flex-col mt-20">
    {news && 
      news.map((item) => (
    <div class="flex justify-center flex-col md:flex-row mt-2 mx-14 mb-14  max-w-md p-8 rounded-md bg-blue-50 shadow-lg">
        <img class="w-96 rounded-lg" src={item.urlToImage} alt="" />
        <div class="ml-8 flex flex-col">
        <p class="text-gray-600">Vaksinasi</p>
        <h5 class="text-gray-900 text-sm mb-5"> {item.title}</h5>
        {item.text}
        <p class="text-gray-600">{item.content}</p>    
        
        <a class="flex-row-reverse mt-16 mb-4 text-blue-400 text-right hover:text-blue-500 transition duration-300 ease-in-out" href={item.url}>
        Baca selengkapnya<MdArrowRightAlt/>
        </a> 
          
        </div>
    </div>
    ))}
    </div>
    </NavBarList>
  )
}
