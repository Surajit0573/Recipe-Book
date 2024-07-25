import { NavLink } from "react-router-dom";

export default function MyRecipes(){
    return(<>
        <NavLink to={'/addRecipe'}><button>Add Your Own Reciepe</button></NavLink>
        <p className="m-8 font-semibold text-2xl ">My Reciepes (0)</p>
    
    </>);
}