import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
export default function useApi({ text, value }) {
    const [data,setData] = useState();
    const navigate = useNavigate();
    let Url = 'https://www.themealdb.com/api/json/v1/1/';
    console.log("text : ", text, "Value :", value);
    if (value && value.length > 0) {
        if (value == "name") {
            Url = Url + `search.php?s=${text}`;
        } else {
            Url = Url + `filter.php?${value}=${text}`;
        }
    } else {
        Url = Url + `random.php`;
    }

    // useEffect(()=>{
        
    // },[]);

    useEffect(() => {
        if (data) {
            console.log("inloop: ",data);
            if (value && value.length > 0) {
                if (value == "name") {
                    if (data.meals && data.meals.length == 1) {
                        navigate("/random", { state: data });
                    }
                } else {
                    if (data.meals && data.meals.length > 0) {
                        navigate("/recipes", { state: data.meals });
                    }
                }
            } else {
                navigate("/random", { state: data });
            }
        }else{
            getData(text, value);
        }
    }, [data]);

    async function getData(text, value) {
        console.log(Url);
        const response = await fetch(Url);
        const d = await response.json();
        console.log("d : ", d);
        setData({...d});
        console.log("data : ", data);
    }
    return { data, getData, setData };

}