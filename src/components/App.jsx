import { Component } from "react";
import Notiflix from 'notiflix';

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

import { searchGallery } from "Api/api";

import css from "./app.module.css";


export class App extends Component {
  state = { 
    search:"",
    gallery:[],
    loading:false,
    error:null,
    page:1,
    modalOpen:false,
    selectedPhoto:{},
    btnLoadMore:false,

  } 

  async componentDidUpdate(_,prevState){
    const{search, page}=this.state;
    //якщо зміниться поле пошуку при onSumit або сторінка при LoadMore, то викликаємо функцію, яка додасть картинки, що відповідають пошуку, в state
    if(search && (search !== prevState.search || page !== prevState.page)){
      this.addGallery();
      
    }
  }
//Отримуємо галерею картинок, яка  приходить в результаті запиту на REST API і додаємо в state 
  async addGallery(){
    const{search,page}=this.state;
    try{
        this.setState({
        loading:true,
      });
      // (data) приходить в результаті запиту на REST API (сама функція запиту searchGallery описана в файлі api)
      const{data}=await searchGallery(search, page);
              
        if (data.totalHits === 0) {
          return Notiflix.Notify.failure('There are no images matching your search query. Please try again');
        }
      
      this.setState(({gallery}) => ({
        //Якщо приходить масив картинок hits, і він не пустий, то додаємо його, інакше залишаємо масив gallery, який був у state
        gallery:data.hits?.length ? [...gallery,...data.hits] : gallery,
      }))

      //Перевірка, чи не закінчилися картинки для відображення кнопки Load More
      const perPage = 12;
      const totalPage = Math.ceil(data.totalHits / perPage);
      if (totalPage > page) {
        this.setState({ btnLoadMore: true });
      } else {
        Notiflix.Notify.info(
          "You've reached the end of search results",
          );
        this.setState({ btnLoadMore: false });
      }
      
    }
    catch (error){
      this.setState({
        error:error.message
      })
    }
    finally{
      this.setState({
        loading:false,
      })
    }
  }
 

  //Функція для ортимання інформації з поля пошуку, тобто інпуту
  handleSearch = ({search}) =>{
    this.setState({
  search:search.toLowerCase(),
  //При введенні нового слова в поле пошуку і клілу (onSubmit) , попередній масив очищаємо, щоб він не залишався на екрані_ і оновлюємо порядок сторінок
  gallery:[],
  page:1,
})
  }

  loadMore = () =>{
    this.setState(({page}) => ({page:page+1}));
  }

  showModal = ({tags,largeImageURL}) => {

    this.setState({
      modalOpen: true,
      //В state додаємо дані картинки , на яку клікнули, для її відмалювання в модвльному вікні (файл Modal)
      selectedPhoto:
      {
        largeImageURL,
        tags,
      }
    })
   
  }
  
  closeModal=()=>{
    this.setState({
      modalOpen:false,
      selectedPhoto:{}
    })
  }


  render() { 
    const {handleSearch, loadMore, showModal, closeModal}=this;
    const {gallery,loading, error,modalOpen, selectedPhoto,btnLoadMore}=this.state;
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
    
    );
  }
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
