import axios from "axios";

const instance = axios.create({
    baseURL:"https://pixabay.com/api/"
})
 
export const searchGallery=(q, page=1) => {
    
    return instance.get("/",{
        params:{
            q,
            page,
            key:"42056505-527219513045129b40c176645",
            image_type:"photo",
            orientation:"horizontal",
            per_page:12,
        }
    })
}
