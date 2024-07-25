import { useEffect } from 'react';
import '../Styles/Card.css';
import { useNavigate } from 'react-router-dom';
export default function Card({ data }) {
    const navigate = useNavigate();
    const open =async ()=>{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data.strMeal}`);
        const result = await response.json();
        if (result) {
            navigate('/random', { state: result });
        }
    }

    return (
        <>
            <div className="card" onClick={open}>
                <img src={data.strMealThumb} alt={data.strMeal} />
                <h4>{data.strMeal}</h4>
            </div>
        </>
    )
}