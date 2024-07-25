import { NavLink,useNavigate } from 'react-router-dom';
import '../Styles/RecipeFinder.css';
import { useState,useContext, useEffect} from 'react';
import { AppContext } from "../AppContext";
// import useApi from '../useApi';
export default function RecipeFinder() {
    const [head,setHead]=useState("Recipe Of The Day");
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const { getData } = useContext(AppContext);
    const navigate=useNavigate();
    async function searchRandomRecipe() {
        setHead("");
        setText("");
        setValue("");
        const data = await getData(text,value);
        navigate('/random',{state:data})
    }

    async function performSearch(){
        setHead("");
        const data = await getData(text,value);
        navigate('/recipes',{state:data})
    }

    
    return(
        <div className="container">
        <h1>Welcome to Recipe Finder</h1>
        <div className="search-container">
            <input type="text" id="searchInput" placeholder="Search..." onChange={(event)=>{setText(event.target.value)}}/>
            <select id="searchBy" onChange={(event)=>{setValue(event.target.value)}}>
                <option value="c">Categories</option>
                <option value="a">Cuisine</option>
                <option value="i">Main Ingredient</option>
                <option value="name">Name</option>
            </select>
            <button onClick={performSearch}>Search</button>
        </div>
        <button onClick={searchRandomRecipe} className='randomBtn'>A Random Recipe</button>
        <h2 style={{color:'violet'}}>{head}</h2>
    </div>
    )
}