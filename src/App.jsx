import { useState } from 'react'
import './App.css'
import RecipeFinder from './RecipeFinder';
import { Route,Routes } from 'react-router-dom';
import Recipes from './Recipes.jsx';
import Random from './Random';
function App() {
  return (
    <>
     <RecipeFinder/>
     <Routes>
       <Route path="/" element={<></>}/>
       <Route path="/random" element={<Random/>}/>
       <Route path="/recipes" element={<Recipes/>}/>
     </Routes>
         </>
  )
}

export default App
