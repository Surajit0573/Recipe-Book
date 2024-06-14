import './Card.css';
import { useNavigate } from 'react-router-dom';
export default function Card({ data }) {
    const navigate = useNavigate();
    async function open() {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data.strMeal}`);
        const data2 = await response.json();
        if (data2) {
            navigate('/random', { state: data2 });
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