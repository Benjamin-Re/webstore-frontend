import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "../styles/Products.css";
import { useMyContext } from "../Context";

export function Products() {
 const { products } = useMyContext();
 const [getProducts, setProducts] = products;

  return (
    <>
      <div className="containerContainer">
      <h2>Products</h2>
        <div className="products-container">
          {getProducts.map((product) => {
            return (
              <div key={product._id}>
                <Card
                  id={product.id}
                  _id={product._id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  imgSrc={product.imgSrc}
                ></Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
