import { useState } from 'react'
import '../Styles/App.css'
import Home from './Home.jsx';
import { Route,Routes } from 'react-router-dom';
import Recipes from './Recipes.jsx';
import Random from './Random.jsx';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
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
     </Routes>
         </>
  )
}

export default App
