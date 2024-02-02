import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import css from "./image-gallery.module.css";

const ImageGallery = ({items, showModal}) => {

    return (
        <ul className={css.imageGallery}>
    {items.map(({id,webformatURL,largeImageURL, tags}) =>
        (<ImageGalleryItem
        showModal={showModal}
        key={id}
        id={id}
        tags={tags}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        />))}
        </ul>
    )
}
export default ImageGallery;