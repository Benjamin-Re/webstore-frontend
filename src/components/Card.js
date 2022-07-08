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
        <div className="upper"><img src={props.imgSrc} alt="depiction of product"></img></div>
        <div className="lower">
          <div className="article">
            <div>{props.name}</div> <div>{props.price}€</div>
          </div>
          {props.stock === 0 ? (<div>Sold Out</div>) : (
            <div className="buttonSection">
            {quantity === 0 ? (
              <button onClick={addToCart}>Add to Cart</button>
            ) : (
              <div>
                <button className="plusMinus" onClick={()=>{decrease(props.id)}} >-</button>
                <span>{quantity}</span>
                <button className="plusMinus" onClick={()=>{increase(props.id, props.stock)}} >+</button>
              </div>
            )}
            </div>
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
        stock: props.stock,
        imgSrc: props.imgSrc
      };
  setCart(prev=>{
    return [...prev, product];
  })
}

}
