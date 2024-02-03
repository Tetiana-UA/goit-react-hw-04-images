import { useEffect } from "react";
import { createPortal } from "react-dom";

import css from "./modal.module.css";


const modalRoot=document.getElementById("modal-root");

export const Modal = ({close, selectedPhoto}) => {
    const closeModal=({target, currentTarget, code}) => {
        if(target === currentTarget || code === "Escape"){
            close()
        }
    }
    
    useEffect(()=>{
    document.addEventListener("keydown", closeModal);
    
    return () => document.removeEventListener("keydown",closeModal);
}
) 

        return createPortal(
            (<div onClick={closeModal} className={css.overlay}>
                <div className={css.modal}>
                    
                <img src={selectedPhoto.largeImageURL} alt="" />

                </div>
            </div>),
            modalRoot
        );
    }

