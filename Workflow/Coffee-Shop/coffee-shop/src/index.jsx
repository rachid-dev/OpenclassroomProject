import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CartProvider, UserDataProvider } from './utils/Context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductForm from './Pages/ProductForm';
import DeliveryNote from './Pages/DeliveryNote';
import DeliveryBill from './Pages/DeliveryBill'
import MyProduct from './Pages/MyProduct';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import WithLoggedIn from './Components/WithLoggedIn';
import Home from './Pages/Home/';




ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserDataProvider>
        <CartProvider>
          <Routes>
            <Route path='/login' element = {<LogIn />} />
            <Route path='/signup' element = {<SignUp />} />
            <Route path='/' element = {<WithLoggedIn WrappedComponent={Home}/>} />
            <Route path='/product/:id' element = {<WithLoggedIn WrappedComponent ={MyProduct} />} />
            <Route path='/deliveryNote/:results' element = {<WithLoggedIn WrappedComponent ={DeliveryNote} />} />
            <Route path='/deliveryBill/:results' element = {<WithLoggedIn WrappedComponent ={DeliveryBill} />} />
            <Route path='/createProduct' element ={<WithLoggedIn WrappedComponent = {ProductForm} />} />
          </Routes>
        </CartProvider>
      </UserDataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
