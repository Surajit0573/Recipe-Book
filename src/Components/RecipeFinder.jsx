import { NavLink,useNavigate } from 'react-router-dom';
import '../Styles/RecipeFinder.css';
import { useState,useContext, useEffect} from 'react';
import { AppContext } from "../AppContext";
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import useApi from '../useApi';
export default function RecipeFinder() {
    const [value, setValue] = useState("c");
    const [text, setText] = useState("");
    const { getData } = useContext(AppContext);
    const navigate=useNavigate();
    async function searchRandomRecipe() {
        setText("");
        setValue("");
        try{
        const data = await getData("","");
       return  navigate('/random',{state:data});
        }catch(error){
            toast.error('Something went wrong');
        }
    }

    async function performSearch(){
        console.log("text : ",text,"value : ",value);
        try{
        const data = await getData(text,value);
        return navigate('/recipes',{state:data});
        }catch(error){
            toast.error('Something went wrong');
        }
    }

    
    return(
        <div className="container">
        <p className='text-4xl font-semibold'>Welcome to Recipe Finder</p>
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
        <h2 className='text-violet-500 text-2xl font-semibold mt-4'>Detailed Recipe</h2>
    </div>
    )
}