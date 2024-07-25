import { useLocation } from "react-router-dom";
import OneRecipe from "./OneRecipe.jsx";
import RecipeFinder from './RecipeFinder.jsx';
import { useEffect, useState } from "react";
export default function Random() {
    const [data,setData]=useState(null);
    const location = useLocation();
   useEffect(()=>{
    setData(location.state);
   },[location.state])
    return (
        <>
        <RecipeFinder/>
        {data&&<OneRecipe data={data.meals[0]}/>}
        </>
    )
}