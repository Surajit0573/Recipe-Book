import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Ingredient() {
    const navigate = useNavigate();
    const [ingd, setingd] = useState();
    useEffect(() => {
        async function fetchData() {
            try{
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            const data = await response.json();
            setingd(data.meals);
            }catch(e){
                toast.error('Something went wrong !!');
            }
        }
        fetchData();
    }, []);

    async function handleClick(curr) {
        console.log(curr);
        return navigate('/oneIngredient', { state: curr });
    }
    return (<>
        <div className="flex flex-wrap p-8 justify-evenly">
            {ingd?ingd.map((d) => <div key={d.idIngredient} className="bg-[#003031] m-2 p-2 rounded-md hover:border-2" onClick={() => handleClick(d)}>
                <img src={`https://www.themealdb.com/images/ingredients/${d.strIngredient}.png`} alt={d.strIngredient} className="h-48" />
                <p className="font-semibold ">{d.strIngredient}</p>
            </div>):<Loader/>}
        </div>
    </>);
}