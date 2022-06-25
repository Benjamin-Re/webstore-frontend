import { Nav } from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import { Products } from "./components/Products";
import { Auth } from "./components/Auth";
import { Signup } from "./components/Signup";
import { Cart } from "./components/Cart";
import { Home } from "./components/Home";
import React, { useState } from "react";
import { ContextProvider } from "./Context";

function App() {
  return (
    <>
      <ContextProvider> {/*Provides getCartState and setCart*/}
        <Nav></Nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </ContextProvider>
    </>
  );
}
 
export default App;
