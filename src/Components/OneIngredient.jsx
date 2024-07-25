import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from './Card.jsx';
import '../Styles/Recipes.css';
import Loader from "./Loader.jsx";
export default function OneIngredient() {
    const location = useLocation();
    const [data, setData] = useState();
    const [recipes, setRecipes] = useState(null);
    useEffect(() => {
        setData(location.state);
    }, [location.state]);

    function transformString(input) {
        return input.trim().split(/\s+/).join('_');
    }

    useEffect(() => {
        async function fetchData() {
            const currIngd = transformString(data.strIngredient);
            const url="https://www.themealdb.com/api/json/v1/1/filter.php?i="+currIngd;
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            setRecipes(result.meals);
        };
        if (data)
            fetchData();
    }, [data])
    return (<>
        <div className="flex p-4 justify-evenly">
            {data && <div className="flex flex-col min-w-fit bg-[#003031] rounded-md p-2"><img src={`https://www.themealdb.com/images/ingredients/${data.strIngredient}.png`} alt={data.strIngredient} className="h-48" />
                <p className="font-semibold ">{data.strIngredient}</p> </div>}
            <div className="flex flex-warp  bg-[#003031] mx-4 rounded-md p-2">
                <p>{data && data.strDescription}</p>
            </div>
        </div>
        <p className="text-3xl font-semibold">Populer Recipes Using {data && data.strIngredient}</p>
        <div className="recipes">
            {recipes?recipes.map((i) => <Card data={i} />):<Loader/>}
        </div>

    </>);
}