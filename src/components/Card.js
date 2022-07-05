import css from "../styles/Card.css";
import { useMyContext } from "../Context";
import { useEffect, useState } from "react";

export function Card(props) {
  const {cart, getQuantity, increase, decrease} = useMyContext();
  const [getCart, setCart] = cart;
  const quantity = getQuantity(props.id);

  return (
    <>
      <div className="card" id={props.id}>
        <div className="upper"><img src={props.imgSrc} alt="a chair"></img></div>
        <div className="lower">
          {props.name}, {props.price}€
          {props.stock === 0 ? (<div>Sold Out</div>) : (
            <>
            {quantity === 0 ? (
              <button onClick={addToCart}>Add to Cart</button>
            ) : (
              <div>
                <button onClick={()=>{increase(props.id, props.stock)}} >+</button>
                <span>{quantity}</span>
                <button onClick={()=>{decrease(props.id)}} >-</button>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </>
  );

function addToCart() {
  const product = {
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: 1,
        stock: props.stock
      };
  setCart(prev=>{
    return [...prev, product];
  })
}

}
