import { useLocation } from "react-router-dom";
import Card from './Card.jsx';
import '../Styles/Recipes.css';
import RecipeFinder from './RecipeFinder.jsx';
export default function Recipes() {
    const location = useLocation();
    const data=location.state;
    console.log(data);
    return (
        <>
        <RecipeFinder/>
        <div className="recipes">
       { data.map((i) =><Card data={i}/>)}
       </div>
        </>
    )
}