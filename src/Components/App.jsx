import { useState } from 'react'
import '../Styles/App.css'
import RecipeFinder from './RecipeFinder.jsx';
import { Route,Routes } from 'react-router-dom';
import Recipes from './Recipes.jsx';
import Random from './Random.jsx';
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
