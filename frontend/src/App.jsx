import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';

function App() {

  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
