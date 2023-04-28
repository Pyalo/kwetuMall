import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import Home from './pages/Home.jsx';
import ProductsDetails from './pages/ProductsDetails.jsx';
import CartDetails from './pages/CartDetails.jsx';

function App() {

  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/productdetails/:id' element={<ProductsDetails/>}/>
        <Route exact path='/cartdetails' element={<CartDetails/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
