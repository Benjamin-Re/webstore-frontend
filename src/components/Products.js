import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import css from '../styles/Products.css';


export function Products() {
const [products, setProducts] = useState([])

useEffect(()=> {
  fetch(`https://enigmatic-temple-40493.herokuapp.com/products`)
  .then(res => res.json())
  .then(json => {
      setProducts(json.data);
      
    })
}, [])

  return (
    <>
      <h2>Products</h2>
      <div className="containerContainer">
      <div className="products-container">
        {products.map(product => {
          return (
            <>
              <Card id={product.id} name={product.name} price={product.price} stock={product.quantity} imgSrc={product.imgSrc}></Card>
            </>
          )
        })}
      </div>
      </div>
    </>
  );
}
