import {useNavigate} from "react-router-dom"

export default function CardBerita({item}) {

    // let shortenDescription = item.description.substring(0, 60)


    let newDescription
    let newUrlImage
    let newAuthor
    let newContent

    if(item.description == null){
        newDescription = "Tidak ada Deksripsi"
    } else {
        newDescription = item.description
    }

    if(item.urlToImage == null){
        newUrlImage = "https://mmc.tirto.id/image/otf/500x0/2019/11/12/istock-1134798557_ratio-16x9.jpg"
    } else {
        newUrlImage = item.urlToImage
    }

    if(item.author == null){
        newAuthor = "Penulis Tidak Diketahui"
    } else {
        newAuthor = item.author
    }

    if(item.content == null){
        newContent = "Unknown"
    } else {
        newContent = item.content
    }

    const navigate = useNavigate()
    const handleDetail = () => {
        navigate(`/berita/${item.title}`, {
            state: {
                source: item.source,
                title: item.title,
                author: newAuthor,
                description: newDescription,
                url: item.url,
                urlToImage: newUrlImage,
                publishedAt: item.publishedAt,
                content: newContent

            }
        })
    }

    return (
        <div>
            <div 
                  className="lg:w-11/12 lg:h-112 w-full h-112 rounded-lg bg-cover bg-center z-0 mb-14" 
                  style={{
                    backgroundImage: `url(${newUrlImage})`
                  }}
                >
                  <div 
                    className="lg:w-full lg:h-112 w-full h-112 rounded-lg z-10 p-7"
                    style={{
                      background: "linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                    }}
                  >
                    <h6 className="text-white text-11 font-500 cursor-pointer" onClick={() => handleDetail(item.title)}>{item.title.length > 40 ? 
                      `${item.title.substring(0, 40)}...` : item.title}</h6>
                    <p className="fontTiny text-white font-200">{newDescription.length > 60 ? 
                      `${newDescription.substring(0, 60)}...` : newDescription}</p>
                    {/* <h6 className="text-white text-11 font-500">{item.title.substring(0, 40)}...</h6>
                    <p className="fontTiny text-white font-200">{newDescription.substring(0, 60)}...</p> */}
                  </div>
            </div>
        </div>
    )
}