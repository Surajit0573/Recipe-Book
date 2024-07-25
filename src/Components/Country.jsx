import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import '../Styles/Recipes.css';
import Loader from './Loader.jsx';

export default function Country() {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch the list of areas from the API
        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then(response => {
                setAreas(response.data.meals);
            })
            .catch(error => {
                console.error('Error fetching the areas:', error);
            });
    }, []);

    const clickHandler = (area) => {
        setSelectedArea(area);
        // Fetch recipes for the selected area
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            .then(response => {
                setRecipes(response.data.meals);
            })
            .catch(error => {
                console.error('Error fetching the recipes:', error);
            });
    };

    const getCountryCode = (area) => {
        const areaToCountryCodeMap = {
            American: 'us',
            British: 'gb',
            Canadian: 'ca',
            Chinese: 'cn',
            Croatian: 'hr',
            Dutch: 'nl',
            Egyptian: 'eg',
            Filipino: 'ph',
            French: 'fr',
            Greek: 'gr',
            Indian: 'in',
            Irish: 'ie',
            Italian: 'it',
            Jamaican: 'jm',
            Japanese: 'jp',
            Kenyan: 'ke',
            Malaysian: 'my',
            Mexican: 'mx',
            Moroccan: 'ma',
            Polish: 'pl',
            Portuguese: 'pt',
            Russian: 'ru',
            Spanish: 'es',
            Thai: 'th',
            Tunisian: 'tn',
            Turkish: 'tr',
            Ukrainian: 'ua',
            Vietnamese: 'vn',
        };
        return areaToCountryCodeMap[area] || 'xx'; // Default to 'xx' if no match
    };

    return (
        <div>
            <p className='text-3xl font-bold'>Browse Recipes By Country</p>
            <div className="flex flex-wrap p-8">
                {areas?areas.map(area => (
                    area.strArea != "Unknown" ?
                        <img
                            key={area.strArea}
                            src={`https://flagsapi.com/${getCountryCode(area.strArea).toUpperCase()}/flat/64.png`}
                            alt={area.strArea}
                            onClick={() => clickHandler(area.strArea)}
                            style={{ cursor: 'pointer', margin: '5px' }}
                        />
                        : null
                )):<Loader/>}
            </div>
            {selectedArea && (
                <div>
                    <h2>Recipes from {selectedArea}</h2>
                    <div className="recipes">
                        {recipes?recipes.map((i) => <Card data={i} />):<Loader/>}
                    </div>
                </div>
            )}
        </div>
    );
};
