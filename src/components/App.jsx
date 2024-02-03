import { useState, useEffect } from "react";
import Notiflix from 'notiflix';

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

import { searchGallery } from "Api/api";

import css from "./app.module.css";


export const App = () => {
  
    const [search, setSearch] = useState("");
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState({});
    const [btnLoadMore, setLoadMore] = useState(false);

  
    useEffect (() => {
//Отримуємо галерею картинок, яка  приходить в результаті запиту на REST API і додаємо в state 
  const addGallery = async () => {
    try{
        setLoading(true);
        // (data) приходить в результаті запиту на REST API (сама функція запиту searchGallery описана в файлі api)
        const{data}=await searchGallery(search, page);
    
        if (data.totalHits === 0) {
          return Notiflix.Notify.failure('There are no images matching your search query. Please try again');
        }
      //Якщо приходить масив картинок hits, і він не пустий, то додаємо його, інакше залишаємо масив prevGallery (тобто gallery, яка була у state до того)
        setGallery(prevGallery => data.hits?.length ? [...prevGallery,...data.hits] : prevGallery)
        

      //Перевірка, чи не закінчилися картинки для відображення кнопки Load More
      const perPage = 12;
      const totalPage = Math.ceil(data.totalHits / perPage);
      if (totalPage > page) {
        setLoadMore(true);
      } else {
        Notiflix.Notify.info(
          "You've reached the end of search results",
          );
          setLoadMore(false);
      }
      
    }
    catch (error){
      setError(error.message)
    }
    finally{
      setLoading(false)
    }
  }
  // Функція буде запускатися тільки якщо не буде порожній search, бо при першому рендеру (загрузці сторінки) немає сенсу робити запит, поки нiчого не вводили в поле search
  if(search){
    addGallery()
  }
},[search,page])


  //Функція для ортимання інформації з поля пошуку, тобто інпуту
  const handleSearch = ({search}) =>{
    setSearch(search);
  //При введенні нового слова в поле пошуку і клілу (onSubmit) , попередній масив очищаємо, щоб він не залишався на екрані_ і оновлюємо порядок сторінок
  setGallery([]);
  setPage(1);
}


  const loadMore = () =>setPage(prevPage => prevPage+1);
  

  const showModal = ({tags,largeImageURL}) => {
      setModalOpen(true);
      //В state додаємо дані картинки , на яку клікнули, для її відмалювання в модвльному вікні (файл Modal)
      setSelectedPhoto ({
        largeImageURL,
        tags,
      })
    }
  
  
  const closeModal=()=>{
      setModalOpen(false);  
      setSelectedPhoto ({})
  }

  //для подальшої перевірки записуємо в константу, що масив картинок(gallery) не порожній , тобто Boolean(gallery.length) буде true. А якщо буде порожній , тоьто false, і далі в return не будемо відмальовувати компоненти
  const isGallery=Boolean(gallery.length)
  

    return (
    <div className={css.app}>
    
        <Searchbar onSubmit={handleSearch}/>
        {loading && <Loader/>}
        {error && <p>{error}</p>}
        {isGallery && <ImageGallery showModal={showModal} items={gallery} />}
        {isGallery && btnLoadMore && <Button onClick={loadMore} type="button">Load more</Button> }

        {modalOpen && <Modal close={closeModal} selectedPhoto={selectedPhoto} />}
    </div>
    
    )
  }






/*export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};*/
