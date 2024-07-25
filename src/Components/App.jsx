import { useState } from 'react'
import '../Styles/App.css'
import Home from './Home.jsx';
import { Route,Routes } from 'react-router-dom';
import Recipes from './Recipes.jsx';
import Random from './Random.jsx';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Country from './Country.jsx';
import Ingredient from './Ingredient.jsx';
import OneIngredient from './OneIngredient.jsx';
import MyRecipes from './MyRecipes.jsx';
import AddRecipe from './AddRecipe.jsx';
function App() {
  return (
    <>
    <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/random" element={<Random/>}/>
       <Route path="/recipes" element={<Recipes/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/country' element={<Country/>}/>
       <Route path='/ingredient' element={<Ingredient/>}/>
       <Route path='/oneIngredient' element={<OneIngredient/>}/>
       <Route path='/myrecipes' element={<MyRecipes/>}/>
       <Route path='/addRecipe' element={<AddRecipe/>}/>
     </Routes>
        </>
  )
}

export default App
