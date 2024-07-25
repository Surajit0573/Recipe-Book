import RecipeFinder from "./RecipeFinder";
import Loader from "./Loader";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    const { getData } = useContext(AppContext);
    useEffect(() => {
        async function fetchData() {
            const data = await getData("", "");
            navigate('/random', { state: data })
        }
        fetchData();
    }, []);

    return (<>
        <RecipeFinder />
        <Loader />
    </>);
}