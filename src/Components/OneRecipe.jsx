import '../Styles/OneRecipe.css'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function OneRecipe({ data }) {
    const navigate = useNavigate();
    let indgs = (data && data.ingredients) || {};
    const [isLog, setIsLog] = useState(false);
    const [like, setLike] = useState(false);
    const [user, setUser] = useState("");
    const { isLoggedin, isLiked } = useContext(AppContext);
    const [owner, setOwner] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                });
                const result = await response.json();
                if(result.ok){
                    setOwner(result.data);
                }

            } catch (e) {
                console.error('Error fetching user details:', error);
                toast.error('Failed to fetch user details');
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const id = data && (data._id || data.idMeal);
        async function fetchData() {
            if (data && data.user) {
                try {
                    const response = await fetch(`http://localhost:3000/api/user/${data.user}`);
                    const user = await response.json();
                    setUser(user.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    toast.error('Failed to fetch user details');
                }
            }
            try {
                const curr = await isLoggedin();
                const temp = await isLiked();
                console.log(curr);
                setIsLog(curr);
                setLike(temp.includes(id));
                console.log("useEffect : ", temp);
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            }
        }
        fetchData();
    }, []);


    function modifiRecipe() {
        if (data && data.ingredients) {
            return navigate('/addRecipe', { state: data });
        } else {
            return navigate('/addRecipe', { state: { ...data, ingredients: indgs } });
        }
    }

    async function handleDelete(){
        if(data&&data._id){
        const id = data._id;
        try {
            // Send the DELETE request
            const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
            });
            const result = await response.json();
            console.log(result);
            if (result.ok) {
                toast.success('Recipe deleted successfully');
                return navigate('/');
            } else {
                if (result.redirect) {
                    toast.error(`${result.message}`);
                    return navigate(result.redirect);
                }
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error :', error);
            toast.error('Something went wrong');
        }
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
                setLike((like) => !like)
            } else {
                if (result.redirect) {
                    toast.error(`${result.message}`);
                    return navigate(result.redirect);
                }
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error :', error);
            toast.error('Something went wrong');
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
                <div className='mb-2 flex absolute right-8'>{owner&&owner==user&&<button className='mx-2 bg-red-500' onClick={handleDelete}>Delete</button>}{isLog && <button onClick={modifiRecipe}>Modify</button>}<button className='mx-2' onClick={handleLike}>{like ? <i className="fa-solid fa-heart text-red-600"></i> : <i className="fa-regular fa-heart"></i>}</button></div>
                <h2 className='text-xl font-semibold mb-6'>"{data.strMeal}"<span className='mt-0 text-sm'>{data && data.user ? <>  ~ created by {user}</> : "  ~ created by API"}</span></h2>
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
                            {ingredients.map((i, index) => <li key={index}>{i}</li>)}
                        </ul>
                    </div>
                </div>
                <h3 className='text-lg font-medium m-4'>Instructions:</h3>
                <p>{instructions}</p>

            </div>
        </>
    )
}