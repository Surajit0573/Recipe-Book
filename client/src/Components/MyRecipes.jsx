import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Card from './Card.jsx';
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../AppContext.jsx";
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyRecipes() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currData, setCurrData] = useState(null);
    const [fev, setFev] = useState([]);
    const [fevData, setFevData] = useState([]);
    const { isLoggedin, isLiked } = useContext(AppContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const curr = await isLoggedin();
                if (!curr) {
                    toast.error('You must be logged in');
                    return navigate('/login');
                }
                const temp = await isLiked();
                setFev(temp);
                // Send the POST request with the file
                const response = await fetch('http://localhost:3000/api/recipe/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                });
                const result = await response.json();
                console.log(result);
                if (result.ok) {
                    console.log(result);
                    setCurrData(result.data);
                } else {
                    if (result.redirect) {
                        toast.error(`${result.message}`);
                        return navigate(result.redirect);
                    }
                    toast.error("Something went wrong");
                }

                // Fetch favorite recipes based on fev IDs
                const fevDataPromises = temp.map(async id => {
                    console.log("ID : " + id);
                    if (isMongoDBObjectId(id)) {
                        const res = await fetch(`http://localhost:3000/api/recipe/${id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: "include",
                            withCredentials: true,
                        });
                        const result = await res.json();
                        return result.data;
                    } else {
                        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                        const data = await res.json();
                        return data.meals[0];
                    }
                });

                const fevDataResults = await Promise.all(fevDataPromises);
                setFevData(fevDataResults);


            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error("Something went wrong");
            }
        }
        fetchData();
    }, []);

    // Helper function to check if an ID is a MongoDB ObjectID
    const isMongoDBObjectId = (id) => {
        return /^[a-f\d]{24}$/i.test(id);
    };

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);



    return (<>
        <NavLink to={'/addRecipe'}><button>Add Your Own Reciepe</button></NavLink>
        <p className="m-8 font-semibold text-2xl ">My Reciepes ({currData && currData.length})</p>
        <div className="recipes">
            {currData && currData.map((i, index) => <Card key={index} data={i} />)}
        </div>

        <p className="m-8 font-semibold text-2xl " id="LikedRecipes">My Favourite Reciepes ({fevData && fevData.length})</p>
        <div className="recipes">
            {fevData && fevData.map((i, index) => <Card key={index} data={i} />)}
        </div>

    </>);
}