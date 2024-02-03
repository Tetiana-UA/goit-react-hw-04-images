import { useState, useEffect, useRef } from "react";
import  css  from "./searchbar.module.css";


const Searchbar = ({onSubmit}) => {
    const [state, setState]  = useState ({
        search:"",
    })

    const inputRef=useRef(null);

    useEffect(()=>{
        inputRef.current.focus(); 
    },[])

    const handleChange = ({target}) => {
        const {name, value}=target;
        setState({
            ...state,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({...state});
        reset();
        
    }
    const reset =()=>{
    setState({
        search:""
    });
}

    return (
        <header className={css.searchbar}>
                <form onSubmit={handleSubmit} className={css.searchForm} >
                    <button 
                    type="submit" 
                    className={css.searchFormButton}>
                    <span className="button-label">Search</span>
                    </button>

                    <input 
                    ref={inputRef}
                    value={state.search}
                    name="search"
                    onChange={handleChange}
                    className={css.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
        </form>
    </header>
        );
    }

 
export default Searchbar;