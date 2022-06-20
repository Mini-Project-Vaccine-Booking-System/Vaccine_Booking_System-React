import React from 'react'
import {articles} from './data'
import Header from './Header'

function Berita() {
  return (

    <>
    <Header/>
    {/* Inti Berita */}
    <div class="container px-5 py-20 mx-auto">
    <div class="flex flex-wrap -m-12">
      <div class="p-10 md:w-1/2 flex flex-col items-start"> 
      <h5 class="text-gray-400">detik.com - 08/06/2022, 14.30 WIB</h5> 
      <h2 class="font-bold sm:text-3xl text-xs title-font text-gray-900 mt-4 mb-4">Jokowi : “Jangan Pilih-pilih Jenis Vaksin Booster, Semua Manfaatnya Sama”</h2>
      <h5 class="text-gray-400" >Penulis : Wade Warren | Editor : Eleanor Pena</h5>
      <div class="flex items-center flex-wrap pb-4 mb-1 w-full">
          <a class="text-black inline-flex items-center font-medium">Bagikan :
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">  
            </svg>
          </a>
          <a>
        
          </a>
          <span class="bg-gray-100 text-gray-500 inline-flex ml-auto items-center leading-none text-sm px-6 py-2 border-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square mx-4" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>20 komentar
          </span>
        </div>
        <img src="https://s3-alpha-sig.figma.com/img/6582/f95a/3cbd1aa7e6b42d111e3b6a1efe7c9e6c?Expires=1656288000&Signature=Mrj8468FFYqf7t81yJfbZEVxIMUUzX6FmT~a-2ssRjC6Va8OfVWKE87npwiUsKGyhZkWs7hpGqgxWu111yH0g7waI-LJHBeZk6ELE1mxJSEIADzzvCDPJE~bKq6xYLmyTCzrYJcDtawmkae7ZUz5Yn~38z3BtjSEs1GsOOVgdkMILk8HdXSfe0GOOOEJe1tB-7TaF-9XJBsav~LaUEteS06tMLxlbh7BsDFYynwgyat~HSQMmw54rb34O0LsloXSNq35G8qIIWtlircMmORtA-dJqNKm1hgkV7ZOUh2gLeZLF0tjTwhOG0zXXH3Lc3proY~Vv3bNTGHfotmpZYyn-A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
        <p class="leading-relaxed mb-6 mt-10">Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal portland. VHS man braid palo santo hoodie brunch trust fund. Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's, slow-carb etsy tumeric. Cray pug you probably haven't heard of them hexagon kickstarter craft beer pork chic.</p>
       
      </div> 

    {/* daftar berita */}

  
    <div class="max-w-xs flex flex-col mt-4"> 
    <div class="flex flex-wrap ml-48 mb-12 ">
    <svg width="73" height="75" viewBox="0 0 73 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.2995 21.8854L27.0374 25.171C22.5897 26.3627 20.6978 29.6609 21.8935 34.1233L25.9432 49.237C27.1585 53.7725 30.4303 55.6244 34.878 54.4326L47.1401 51.147C51.6596 49.936 53.494 46.7159 52.2787 42.1804L48.229 27.0668C47.0333 22.6044 43.819 20.6744 39.2995 21.8854Z" fill="url(#paint0_linear_425_4810)"/>
<g filter="url(#filter0_f_425_4810)">
<rect x="30.9084" y="49.1602" width="19.5614" height="16.5649" rx="8.28243" transform="rotate(-105 30.9084 49.1602)" fill="url(#paint1_linear_425_4810)"/>
</g>
<g filter="url(#filter1_b_425_4810)">
<path d="M50.8304 29.7061H38.1358C33.5311 29.7061 30.8501 32.4022 30.8501 37.022V52.6688C30.8501 57.3644 33.5311 59.9999 38.1358 59.9999H50.8304C55.5093 59.9999 58.1146 57.3644 58.1146 52.6688V37.022C58.1146 32.4022 55.5093 29.7061 50.8304 29.7061Z" fill="#66A7FF"/>
<path d="M50.8304 29.2061H38.1358C35.7362 29.2061 33.774 29.9104 32.4118 31.2789C31.0499 32.647 30.3501 34.6162 30.3501 37.022V52.6688C30.3501 55.1106 31.0489 57.085 32.4126 58.4487C33.7763 59.8124 35.7393 60.4999 38.1358 60.4999H50.8304C53.2622 60.4999 55.2266 59.8134 56.582 58.4474C57.9369 57.0819 58.6146 55.1068 58.6146 52.6688V37.022C58.6146 34.62 57.9358 32.6501 56.5828 31.2802C55.2288 29.9094 53.2652 29.2061 50.8304 29.2061Z" stroke="url(#paint2_linear_425_4810)" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<g filter="url(#filter2_bd_425_4810)">
<mask id="path-5-inside-1_425_4810" fill="white">
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.5447 36.75V36.7651C37.8919 36.7651 37.3633 37.2953 37.3633 37.9466C37.3633 38.5979 37.8919 39.1281 38.5447 39.1281H43.0721C43.725 39.1281 44.2551 38.5979 44.2551 37.9299C44.2551 37.2801 43.725 36.75 43.0721 36.75H38.5447ZM50.4199 45.9747H38.5447C37.8919 45.9747 37.3633 45.4446 37.3633 44.7933C37.3633 44.142 37.8919 43.6103 38.5447 43.6103H50.4199C51.0712 43.6103 51.6014 44.142 51.6014 44.7933C51.6014 45.4446 51.0712 45.9747 50.4199 45.9747ZM50.42 52.8968H38.5448C38.0904 52.9574 37.6512 52.7302 37.4088 52.3515C37.1665 51.9577 37.1665 51.4578 37.4088 51.0792C37.6512 50.6853 38.0904 50.4733 38.5448 50.5187H50.42C51.0244 50.5793 51.4803 51.0943 51.4803 51.7153C51.4803 52.3197 51.0244 52.8362 50.42 52.8968Z"/>
</mask>
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.5447 36.75V36.7651C37.8919 36.7651 37.3633 37.2953 37.3633 37.9466C37.3633 38.5979 37.8919 39.1281 38.5447 39.1281H43.0721C43.725 39.1281 44.2551 38.5979 44.2551 37.9299C44.2551 37.2801 43.725 36.75 43.0721 36.75H38.5447ZM50.4199 45.9747H38.5447C37.8919 45.9747 37.3633 45.4446 37.3633 44.7933C37.3633 44.142 37.8919 43.6103 38.5447 43.6103H50.4199C51.0712 43.6103 51.6014 44.142 51.6014 44.7933C51.6014 45.4446 51.0712 45.9747 50.4199 45.9747ZM50.42 52.8968H38.5448C38.0904 52.9574 37.6512 52.7302 37.4088 52.3515C37.1665 51.9577 37.1665 51.4578 37.4088 51.0792C37.6512 50.6853 38.0904 50.4733 38.5448 50.5187H50.42C51.0244 50.5793 51.4803 51.0943 51.4803 51.7153C51.4803 52.3197 51.0244 52.8362 50.42 52.8968Z" fill="url(#paint3_linear_425_4810)"/>
<path d="M38.5447 36.7651V37.1651H38.9447V36.7651H38.5447ZM38.5447 36.75V36.35H38.1447V36.75H38.5447ZM38.5448 52.8968V52.4968H38.5183L38.492 52.5003L38.5448 52.8968ZM50.42 52.8968V53.2968H50.44L50.4599 53.2948L50.42 52.8968ZM37.4088 52.3515L37.0681 52.5612L37.0719 52.5671L37.4088 52.3515ZM37.4088 51.0792L37.7458 51.2948L37.7495 51.2888L37.4088 51.0792ZM38.5448 50.5187L38.505 50.9167L38.5249 50.9187H38.5448V50.5187ZM50.42 50.5187L50.4599 50.1207L50.44 50.1187H50.42V50.5187ZM38.9447 36.7651V36.75H38.1447V36.7651H38.9447ZM37.7633 37.9466C37.7633 37.5159 38.1131 37.1651 38.5447 37.1651V36.3651C37.6706 36.3651 36.9633 37.0747 36.9633 37.9466H37.7633ZM38.5447 38.7281C38.1131 38.7281 37.7633 38.3773 37.7633 37.9466H36.9633C36.9633 38.8185 37.6706 39.5281 38.5447 39.5281V38.7281ZM43.0721 38.7281H38.5447V39.5281H43.0721V38.7281ZM43.8551 37.9299C43.8551 38.3803 43.5007 38.7281 43.0721 38.7281V39.5281C43.9492 39.5281 44.6551 38.8155 44.6551 37.9299H43.8551ZM43.0721 37.15C43.5047 37.15 43.8551 37.5017 43.8551 37.9299H44.6551C44.6551 37.0586 43.9452 36.35 43.0721 36.35V37.15ZM38.5447 37.15H43.0721V36.35H38.5447V37.15ZM38.5447 46.3747H50.4199V45.5747H38.5447V46.3747ZM36.9633 44.7933C36.9633 45.6652 37.6706 46.3747 38.5447 46.3747V45.5747C38.1131 45.5747 37.7633 45.224 37.7633 44.7933H36.9633ZM38.5447 43.2103C37.67 43.2103 36.9633 43.9221 36.9633 44.7933H37.7633C37.7633 44.3619 38.1138 44.0103 38.5447 44.0103V43.2103ZM50.4199 43.2103H38.5447V44.0103H50.4199V43.2103ZM52.0014 44.7933C52.0014 43.9217 51.2928 43.2103 50.4199 43.2103V44.0103C50.8496 44.0103 51.2014 44.3622 51.2014 44.7933H52.0014ZM50.4199 46.3747C51.2921 46.3747 52.0014 45.6655 52.0014 44.7933H51.2014C51.2014 45.2237 50.8503 45.5747 50.4199 45.5747V46.3747ZM38.5448 53.2968H50.42V52.4968H38.5448V53.2968ZM37.0719 52.5671C37.3906 53.0651 37.976 53.3762 38.5977 53.2933L38.492 52.5003C38.2048 52.5386 37.9117 52.3953 37.7457 52.1359L37.0719 52.5671ZM37.0719 50.8635C36.7438 51.3761 36.7483 52.0414 37.0682 52.5611L37.7495 52.1419C37.5846 51.874 37.5891 51.5395 37.7457 51.2948L37.0719 50.8635ZM38.5846 50.1207C37.9802 50.0603 37.392 50.3432 37.0682 50.8695L37.7495 51.2888C37.9103 51.0275 38.2007 50.8863 38.505 50.9167L38.5846 50.1207ZM50.42 50.1187H38.5448V50.9187H50.42V50.1187ZM51.8803 51.7153C51.8803 50.8964 51.2762 50.2025 50.4599 50.1207L50.3801 50.9167C50.7726 50.9561 51.0803 51.2922 51.0803 51.7153H51.8803ZM50.4599 53.2948C51.2734 53.2132 51.8803 52.5204 51.8803 51.7153H51.0803C51.0803 52.1189 50.7754 52.4592 50.3801 52.4988L50.4599 53.2948Z" fill="url(#paint4_linear_425_4810)" mask="url(#path-5-inside-1_425_4810)"/>
</g>
<defs>
<filter id="filter0_f_425_4810" x="0.704834" y="0.837402" width="71.3447" height="73.4634" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="13.5" result="effect1_foregroundBlur_425_4810"/>
</filter>
<filter id="filter1_b_425_4810" x="5.8501" y="4.70605" width="77.2644" height="80.2939" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImage" stdDeviation="12"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_425_4810"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_425_4810" result="shape"/>
</filter>
<filter id="filter2_bd_425_4810" x="22.2271" y="21.75" width="44.3743" height="46.1567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImage" stdDeviation="7.5"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_425_4810"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="5" dy="5"/>
<feGaussianBlur stdDeviation="5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.577356 0 0 0 0 0.359375 0 0 0 0 0.9375 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="effect1_backgroundBlur_425_4810" result="effect2_dropShadow_425_4810"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_425_4810" result="shape"/>
</filter>
<linearGradient id="paint0_linear_425_4810" x1="16.2361" y1="24.0826" x2="52.8804" y2="24.4832" gradientUnits="userSpaceOnUse">
<stop offset="0.0217334" stop-color="#026DE1"/>
<stop offset="0.598958" stop-color="#448BEC"/>
<stop offset="0.989583" stop-color="#83AFEB"/>
</linearGradient>
<linearGradient id="paint1_linear_425_4810" x1="28.8523" y1="47.0567" x2="52.9134" y2="55.8871" gradientUnits="userSpaceOnUse">
<stop offset="0.0217334" stop-color="#026DE1"/>
<stop offset="0.598958" stop-color="#448BEC"/>
<stop offset="0.989583" stop-color="#83AFEB"/>
</linearGradient>
<linearGradient id="paint2_linear_425_4810" x1="35.1902" y1="33.2353" x2="54.8424" y2="55.1411" gradientUnits="userSpaceOnUse">
<stop stop-color="white" stop-opacity="0.25"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_425_4810" x1="50.5822" y1="39.6675" x2="34.5671" y2="40.1321" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.2"/>
</linearGradient>
<linearGradient id="paint4_linear_425_4810" x1="39.5152" y1="38.6323" x2="50.0086" y2="50.195" gradientUnits="userSpaceOnUse">
<stop stop-color="white" stop-opacity="0.25"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
    </svg>
    <h4 class="text-black inline-flex items-center font-semibold">Berita Terkait</h4>
    <h5 class="items-center text-gray-500">Informasi mengenai covid-19 dan vaksinasi</h5>
    </div>

    <div class="mt-4 ml-48 flex-col space-y-4">
    {articles.map((item) => (
    <div>
      <img class="w-full rounded-2xl" src={item.urlToImage} alt="" />
      <div class=" px-16 ml-5 mb-6 text-white bg-gray-300 bg-opacity-75 rounded-3xl absolute">
      <h1 class="text-xs">
      Sebaran Covid Terkini 
      </h1>  
      <h2>
      DKI Jakarta Tertinggi
      </h2>
      </div> 
    </div>
    ))}
    </div>
    </div>
  
    </div>
  </div>
    </>
  )
}

export default Berita