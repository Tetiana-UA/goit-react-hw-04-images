import css from "./image-gallery-item.module.css";

const ImageGalleryItem = ({id, webformatURL,tags,largeImageURL, showModal}) => {
    return (
        <li 
        className={css.imageGalleryItem}
        key={id}
        onClick={()=>showModal({tags, largeImageURL})}>
        <img 
        className={css.photo}
        src={webformatURL}
        alt={tags} />
        </li>
    )
}
export default ImageGalleryItem;



