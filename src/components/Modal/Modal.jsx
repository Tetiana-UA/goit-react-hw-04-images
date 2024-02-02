import { Component } from "react";
import { createPortal } from "react-dom";

import css from "./modal.module.css";


const modalRoot=document.getElementById("modal-root");

export class Modal extends Component {
    
componentDidMount(){
    document.addEventListener("keydown",this.closeModal)
    
}

closeModal=({target, currentTarget, code}) => {
    if(target === currentTarget || code === "Escape"){
        this.props.close()
    }
}

    render() {
        const {closeModal} =this;
        const {selectedPhoto}=this.props;
        
      

        return createPortal(
            (<div onClick={closeModal} className={css.overlay}>
                <div className={css.modal}>
                    
                <img src={selectedPhoto.largeImageURL} alt="" />

    
                </div>
            </div>),
            modalRoot
        );
    }
}
 
