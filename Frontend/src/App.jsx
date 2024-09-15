import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Style from "./App.module.css"
import LoginPage from './Components/loginPage';
import CreateAccountPage from './Components/createAccountPage';
import MainPage from './Components/mainPage';
import ProductPage from './Components/productPage';
import ContactPage from './Components/contactPage';
import BulkBuyers from './Components/bulkBuyers';
import ProfilePage from './Components/profilePage';

function App() {
  return <>

  <BrowserRouter>
  <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/createAccountPage' element={<CreateAccountPage/>}/>
    <Route path='/mainPage' element={<MainPage/>}/>
    <Route path='/productPage' element={<ProductPage/>}/>
    <Route path='/contactPage' element={<ContactPage/>}/>
    <Route path='/bulkBuyer' element={<BulkBuyers/>}/>
    <Route path='/profilePage' element={<ProfilePage/>}/>
  </Routes>
  </BrowserRouter>

  </>
}

export default App;
