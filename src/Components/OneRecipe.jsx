import '../Styles/OneRecipe.css'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

export default function OneRecipe({ data }) {
    const navigate = useNavigate();
    let indgs = (data && data.ingredients) || {};
    const [isLog, setIsLog] = useState(false);
    const [like, setLike] = useState(false);
    const { isLoggedin,isLiked } = useContext(AppContext);

    useEffect(() => {
        const id = data && (data._id || data.idMeal);
        async function fetchData() {
            const curr = await isLoggedin();
            const temp=await isLiked();
            console.log(curr);
            setIsLog(curr);
            setLike(temp.includes(id));
            console.log("useEffect : ",temp);
        }
        fetchData();
    }, []);


    function modifiRecipe() {
        if (data && data.ingredients) {
            navigate('/addRecipe', { state: data });
        } else {
            navigate('/addRecipe', { state: { ...data, ingredients: indgs } });
        }
    }

    async function handleLike() {
        const id = data && (data._id || data.idMeal);
        try {
            // Send the POST request with the file
            const response = await fetch(`http://localhost:3000/api/user/like/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
            });
            const result = await response.json();
            console.log(result);
            if (result.ok) {
               setLike((like)=>!like)
            } else {
                if(result.redirect) {
                    alert(result.massage);
                    navigate(result.redirect);
                }
                alert("Something went wrong. Please try again !!");
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    function getIngredientsList(data) {
        const ingredients = [];

        for (let i = 1; i <= 30; i++) { // Assuming a maximum of 30 ingredients
            let ingredient;
            let measure;
            if (data && data.ingredients) {
                ingredient = data.ingredients[`strIngredient${i}`];
                measure = data.ingredients[`strMeasure${i}`];
            } else {
                ingredient = data[`strIngredient${i}`];
                measure = data[`strMeasure${i}`];
                indgs = ({ ...indgs, [`strIngredient${i}`]: ingredient, [`strMeasure${i}`]: measure });
            }
            if (ingredient && measure) {
                ingredients.push(`${measure} ${ingredient}`);
            } else {
                break; // Stop when there are no more ingredients
            }
        }

        return ingredients;
    }

    const category = data.strCategory;
    const cuisine = data.strArea;
    const thumbnail = data.strMealThumb;
    const recipeVideo = data.strYoutube;
    const ingredients = getIngredientsList(data);
    const instructions = data.strInstructions;

    return (
        <>
            <div className="oneContainer">
                <div className='mb-2 flex absolute right-8'>{isLog && <button onClick={modifiRecipe}>Modify</button>}<button className='mx-2' onClick={handleLike}>{like?<i className="fa-solid fa-heart text-red-600"></i>:<i className="fa-regular fa-heart"></i>}</button></div>
                <h2 className='text-xl font-semibold mb-6'>"{data.strMeal}"<span className='mt-0 text-sm'>{data&&data.user?"  ~ created by User":"  ~ created by API"}</span></h2>
                <div className='intro'>
                    <div>
                        <img src={thumbnail} alt={data.strMeal} />
                    </div>
                    <div>
                        <p><span className='text-lg font-medium'>CateGory :</span>{category}</p>
                        <p><span className='text-lg font-medium'>Cuisine :</span> {cuisine}</p>
                        <p><span className='text-lg font-medium'>Recipe Video :</span> <a href={recipeVideo} rel="noreferrer" target="_blank" >Watch Here</a></p>
                        <h3 className='text-lg font-medium my-2'>Ingredients:</h3>
                        <ul>
                            {ingredients.map((i) => <li>{i}</li>)}
                        </ul>
                    </div>
                </div>
                <h3 className='text-lg font-medium m-4'>Instructions:</h3>
                <p>{instructions}</p>

            </div>
        </>
    )
}