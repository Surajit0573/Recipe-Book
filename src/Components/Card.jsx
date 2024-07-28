import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import '../Styles/Card.css';
import { useNavigate } from 'react-router-dom';
export default function Card({ data }) {
    const [like, setLike] = useState(false);
    const {isLiked } = useContext(AppContext);
    useEffect(() => {
        const id = data && (data._id || data.idMeal);
        async function fetchData() {
            const temp=await isLiked();
            setLike(temp.includes(id));
        }
        fetchData();
    }, []);
    const navigate = useNavigate();
    const open =async ()=>{
        if(data&&data.idMeal){
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data&&data.idMeal}`);
        const result = await response.json();
        if (result) {
            navigate('/random', { state: result });
        }
    }else{
        navigate('/random', { state:{meals:[data]}});
    }
    }

    return (
        <>
            <div className="card" onClick={open}>
            <div className='absolute'>{like&&<i className="fa-solid fa-heart text-2xl m-2 text-red-600"></i>}</div>
                <img src={data&&data.strMealThumb} alt={data&&data.strMeal} />
                <h4>{data&&data.strMeal}</h4>
            </div>
        </>
    )
}