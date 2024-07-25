import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../Styles/AddCourse.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function AddRecipe() {
    const navigate = useNavigate();
    const [heading, setHeading] = useState("Create Your Recipe");
    const [recipe, setRecipe] = useState({
        strMeal: '',
        strCategory: '',
        strArea: '',
        strInstructions: '',
        strYoutube: '',

    });
    const { getUrl, deleteFile } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [ingredients, setIngredients] = useState({});
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('http://localhost:3000/api/user/recipe', {
    //             method: 'GET',
    //             credentials: "include",
    //             withCredentials: true,
    //         });
    //         const result = await response.json();
    //         if (result.ok) {
    //             console.log(result);
    //             setRecipe({
    //                 fullname: result.data.fullname,
    //                 about: result.data.about
    //             })
    //             setIngredients(result.data.ingredients);
    //             setUrl(result.data.dp);
    //             setHeading("Modify This Recipe");
    //         } else {
    //             console.log(result.message);
    //         }
    //     }
    //     fetchData();
    // }, [])

    const styles =
    {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
            '& input': {
                color: 'white',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
        },
        marginBottom: '20px',
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        width: '70%',
        marginRight: '10px',
    }

    useEffect(() => {
        async function update() {
            const currUrl = await getUrl(file);
            console.log(currUrl);
            setUrl(currUrl);
        }
        if (file != null) {
            update();
        }
    }, [file]);

    function addIngredient(e) {
        e.preventDefault();
        const index=Object.keys(ingredients).length/2+1;
        const a="strIngredient"+index;
        const b="strMeasure"+index;
        if (ingredient.trim().length !== 0) {
            setIngredients({...ingredients,[a]:ingredient.trim(),[b]:amount.trim()});
            setIngredient('');
            setAmount('');
        }
        console.log(ingredients);
    }

    function deleteIngredient(e) {
        console.log(e.target.getAttribute('name'));
        setIngredients(ingredients.filter((t) => t != e.target.getAttribute('name')));
    }

    function handleChange(e) {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }

    async function handleFileChange(e) {
        setFile(e.target.files[0]);
        console.log(url);
        deleteFile(url);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log( recipe, links, ingredients,url);
        try {
            // Send the POST request with the file
            // const response = await fetch('http://localhost:3000/api/user/recipe/', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: "include",
            //     withCredentials: true,
            //     body: JSON.stringify({ fullname: recipe.fullname, about: recipe.about, links, ingredients, dp: url })
            // });
            // const result = await response.json();
            // console.log(result);
            // if (result.ok) {
            //     navigate('/recipe');
            // } else {
            //     alert("Something went wrong. Please try again !!");
            // }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    return (
        <>
            <div className="addCourse">
                <h1 className="text-3xl m-4">{heading}</h1>
                <div className="addCourseForm">
                    <TextField id="outlined-basic" name="strMeal" value={recipe.strMeal} onChange={handleChange} label='Name' variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="strCategory" value={recipe.strCategory} onChange={handleChange} label='Category' variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="strArea" value={recipe.strArea} onChange={handleChange} label='Area' variant="outlined" sx={styles} className='inputtext' required />
                    <div className='upload w-[535px]'>
                        <img src={url}></img>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            name="dp"
                            onChange={handleFileChange}
                        >
                            Upload Thumbnail

                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </div>

                    <p className='text-2xl font-semibold my-2 mb-4'>Add all required ingredients</p>
                    <div className='flex items-center'>
                        <TextField id="outlined-basic" value={ingredient} onChange={(e) => setIngredient(e.target.value)} label='Add Ingredient' variant="outlined" sx={styles} className='inputtext' />
                        <TextField id="outlined-basic" value={amount} onChange={(e) => setAmount(e.target.value)} label='Add Amount' variant="outlined" sx={styles} className='inputtext' />
                        <Button type='submit' onClick={addIngredient} disabled={!((amount != '') && (ingredient != ''))} variant="contained" size="medium">ADD</Button>
                    </div>
                    {/* <div className="showTags">
                        {ingredients.map((t, index) => (<div key={index} className="oneTag">{t}<button name={t} onClick={deleteIngredient}><i name={t} className="fa-solid fa-xmark flex self-center"></i></button></div>))}
                    </div> */}

                    <TextField id="outlined-multiline-static" name="strInstructions" value={recipe.strInstructions} onChange={handleChange} label="Add Your Detailed Instructions Here" multiline rows={5} sx={styles} className='inputtext' required />
                    <Button type='submit' onClick={handleSubmit} disabled={!((url != '') && (ingredients.length > 0))} variant="contained" size="medium">SAVE</Button>
                </div>
            </div>
        </>
    )
}