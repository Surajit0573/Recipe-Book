import { useLocation } from "react-router-dom";
import OneRecipe from "./OneRecipe.jsx";
export default function Random() {
    const location = useLocation();
    const data=location.state;
    return (
        <>
        <OneRecipe data={data.meals[0]}/>
        </>
    )
}