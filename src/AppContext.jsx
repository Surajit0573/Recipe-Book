import { createContext, useState, useEffect } from "react";
import axios from 'axios';
export const AppContext = createContext();
export default function AppContextProvider({ children }) {

    function convertToUnderscore(str) {
        return str.split(' ').join('_');
    }

    async function getData(text,value){
       console.log(text,value);
        const currText = convertToUnderscore(text);
        let Url = 'https://www.themealdb.com/api/json/v1/1/';
        if (value && value.length > 0) {
            if (value == "name") {
                Url = Url + `search.php?s=${currText}`;
            } else {
                Url = Url + `filter.php?${value}=${currText}`;
            }
        } else {
            Url = Url + `random.php`;
        }
        console.log(Url);
        const response = await fetch(Url);
        let data=await response.json();
        
        if (value && value.length > 0) {
            const setResponse=await fetch(`http://localhost:3000/api/recipe/${value}/${currText}`);
            const recipes=await setResponse.json();
            console.log("Im here now from  DB",recipes);
            if(data&&data.meals){
            data.meals=[...data.meals,...recipes.data];
            }else{
                data.meals=recipes.data;
            }
        }
        return data;
    }



    async function isLoggedin() {
        const response = await fetch('http://localhost:3000/api/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            withCredentials: true,
        });
        const result = await response.json();
        return result.ok;
    }

    async function isLiked() {
        const response = await fetch('http://localhost:3000/api/user/like', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            withCredentials: true,
        });
        const result = await response.json();
        console.log("Here : ",result);
        return result.data||[];
    }


    function getFileType(mimeType) {
        if (typeof mimeType !== 'string') {
            throw new Error('Input must be a string');
        }

        const parts = mimeType.split('/');
        return parts[0];
    }
    async function getUrl(file) {
        if (file == null) {
            console.log("No File");
            return null;
        }
        const type = getFileType(file.type);
        const API = type == "video" ? 'http://localhost:3000/api/upload/video' : 'http://localhost:3000/api/upload/';
        try {
            // Send the POST request with the file
            const response = await axios.post(API, { file }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
            return response.data.url;

        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    }

    async function deleteFile(url) {
        if (url != '') {
            // Extract the necessary part from the URL
            const urlSegments = url.split('/');
            const lastTwoSegments = urlSegments.slice(-2).join('/').split('.')[0];
            const type = lastTwoSegments.split('/')[0]; // "skillshare"
            const publicId = lastTwoSegments.split('/')[1]; // "hlsuokgvbogo3mp3o1ep"
            console.log("Details: ", url, urlSegments, lastTwoSegments, publicId, type);
            try {
                // Send the POST request with the file
                const response = await axios.post('http://localhost:3000/api/upload/delete', { publicId, type });
                console.log(response);

            } catch (error) {
                console.error('Error deleteing file:', error);
            }
        }
    }

    const value = { getUrl, deleteFile, isLoggedin,getData,isLiked };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}