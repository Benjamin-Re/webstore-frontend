import css from "./card.css";
import { useMyContext } from "../Context";
import { useEffect, useState } from "react";

export function Card(props) {
  const {cart, getQuantity, increase, decrease} = useMyContext();
  const [getCart, setCart] = cart;
  const quantity = getQuantity(props.id);

  
  // // Get the quantity on page load from local storage(if any is saved)
  // useEffect(()=>{
  //   let data = localStorage.getItem("quantity");
  //   if(data){
  //     setQuantity(JSON.parse(data));
  //   }
  // }, []);

  // // Save the quantity on every render
  // useEffect(()=>{
  //   localStorage.setItem("quantity", JSON.stringify(getQuantity));
  // })

  return (
    <>
      <div className="card" id={props.id}>
        <div className="upper"></div>
        <div className="lower">
          {props.name}, {props.price}€
          {props.stock === 0 ? (<div>Sold Out</div>) : (
            <>
            {quantity === 0 ? (
              <button onClick={addToCart}>Add to Cart</button>
            ) : (
              <div>
                <button onClick={()=>{increase(props.id, props.stock)}} >+</button>
                <span></span>
                <button onClick={()=>{decrease(props.id)}} >-</button>
              </div>
            )}
            </>
          )}
          {quantity}
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
      };
  setCart(prev=>{
    return [...prev, product];
  })
}
  // function increase() {
  //   let quantity = getQuantity + 1;
  //   setQuantity(quantity);
  //   const product = {
  //     id: props.id,
  //     name: props.name,
  //     price: props.price,
  //     quantity: quantity,
  //   };
  //   console.log(product)
  //   setCart((prevState) => {
  //     // Always create a new State from the old one, dont manipl the old one
  //     let newState = prevState;
  //     newState = newState.filter((elem) => {
  //       return elem.id !== product.id;
  //     });
  //     newState.push(product);
  //     return newState;
  //   });
  // }

  // function decrease() {
  //   let quantity = getQuantity - 1;
  //   setQuantity(quantity);
  //   const product = {
  //     id: props.id,
  //     name: props.name,
  //     price: props.price,
  //     quantity: quantity,
  //   };
  //   setCart((prevState) => {
  //     let newState = prevState;
  //     newState = newState.filter((elem) => {
  //       return elem.id !== product.id;
  //     });
  //     newState.push(product);
  //     console.log(newState);
  //     return newState;
  //   });
  // }
}
