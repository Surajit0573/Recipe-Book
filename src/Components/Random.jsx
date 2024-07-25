import { useLocation } from "react-router-dom";
import OneRecipe from "./OneRecipe.jsx";
import RecipeFinder from './RecipeFinder.jsx';
export default function Random() {
    const location = useLocation();
    const data=location.state;
    return (
        <>
        <RecipeFinder/>
        <OneRecipe data={data.meals[0]}/>
        </>
    )
}