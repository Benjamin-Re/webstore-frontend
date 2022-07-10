import { Nav } from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import { Products } from "./components/Products";
import { Auth } from "./components/Auth";
import { Signup } from "./components/Signup";
import { Cart } from "./components/Cart";
import { Home } from "./components/Home";
import React, { useState } from "react";
import { ContextProvider } from "./Context";
import { MyOrders } from './components/Dashboard/MyOrders';
import { ProfileDetails } from './components/Dashboard/ProfileDetails';
import {ChangeAddress} from './components/Dashboard/ChangeProfile/ChangeAddress.js'
import './styles/App.css';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { Admin } from './components/Admin';

function App() {
  return (
    <div id="root">
      <ContextProvider> {/*Provides getCartState and setCart*/}
        <Nav></Nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile-details" element={<ProfileDetails />} />
            <Route path="/address" element={<ChangeAddress />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer></Footer>
      </ContextProvider>
    </div>
  );
}
 
export default App;
