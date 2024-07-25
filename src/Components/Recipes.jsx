import { useLocation } from "react-router-dom";
import Card from './Card.jsx';
import '../Styles/Recipes.css';
import RecipeFinder from './RecipeFinder.jsx';
import { useState,useEffect } from "react";
export default function Recipes({data}) {
    const [currData,setCurrData]=useState(null);
    const location = useLocation();
    useEffect(()=>{
        if(data){
            setCurrData(data);
        }else{
            if(location&&location.state){
                setCurrData(location.state.meals);
            }
        }
    },[data])

    return (
        <>
        <RecipeFinder/>
        <div className="recipes">
       {currData&&currData.map((i) =><Card data={i}/>)}
       </div>
        </>
    )
}