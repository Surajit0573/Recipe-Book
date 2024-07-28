import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../Styles/Card.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Card({ data }) {
    const [like, setLike] = useState(false);
    const { isLiked } = useContext(AppContext);
    useEffect(() => {
        const id = data && (data._id || data.idMeal);
        async function fetchData() {
            try {
                const temp = await isLiked();
                setLike(temp.includes(id));
            } catch (e) {
                toast.error('Something went wrong !!');
            }
        }
        fetchData();
    }, []);
    const navigate = useNavigate();
    const open = async () => {
        try{
        if (data && data.idMeal) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data && data.idMeal}`);
            const result = await response.json();
            if (result) {
                return navigate('/random', { state: result });
            }
        } else {
            return navigate('/random', { state: { meals: [data] } });
        }
    }catch(e){
        toast.error('Something went wrong !!');
    }
    }

    return (
        <>
            <div className="card" onClick={open}>
                <div className='absolute'>{like && <i className="fa-solid fa-heart text-2xl m-2 text-red-600"></i>}</div>
                <img src={data && data.strMealThumb} alt={data && data.strMeal} />
                <h4>{data && data.strMeal}</h4>
            </div>
        </>
    )
}