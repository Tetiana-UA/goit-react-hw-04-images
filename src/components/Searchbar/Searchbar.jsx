import { Component } from "react";
import  css  from "./searchbar.module.css";

class Searchbar extends Component {
    state = { 
        search:""
    } 

    handleChange = ({target}) => {
        const {name, value}=target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state});
        this.setState({
            search:""
        })
    }




    render() {
        const {handleChange, handleSubmit}=this; 
        const {search}=this.state;

        return (
            <header className={css.searchbar}>
                <form onSubmit={handleSubmit} className={css.searchForm} >
                    <button 
                    type="submit" 
                    className={css.searchFormButton}>
                    <span className="button-label">Search</span>
                    </button>

                    <input 
                    value={search}
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
}
 
export default Searchbar;