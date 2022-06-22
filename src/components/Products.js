import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import css from './products.css';


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
      <div className="products-container">
        {products.map(product => {
          return (
            <>
              <Card id={product.id} name={product.name} price={product.price}></Card>
            </>
          )
        })}
      </div>
    </>
  );
}
