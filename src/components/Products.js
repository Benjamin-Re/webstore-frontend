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
              <>
                <Card
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  imgSrc={product.imgSrc}
                ></Card>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
