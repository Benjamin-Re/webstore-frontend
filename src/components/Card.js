import css from "./card.css";
import { useMyContext } from "../Context";
import { useEffect, useState } from "react";

export function Card(props) {
  const { cart, logged, token } = useMyContext();
  const [getCart, setCart] = cart;
  const [getQuantity, setQuantity] = useState(0);
  
  // Get the quantity on page load (if any is saved)
  useEffect(()=>{
    let data = localStorage.getItem("quantity");
    if(data){
      setQuantity(JSON.parse(data));
    }
  }, []);

  // Save the quantity on every render
  useEffect(()=>{
    localStorage.setItem("quantity", JSON.stringify(getQuantity));
  })

  return (
    <>
      <div className="card" id={props.id}>
        <div className="upper"></div>
        <div className="lower">
          {props.name}, {props.price}€
          {getQuantity === 0 ? (
            <button onClick={increase}>Add to Cart</button>
          ) : (
            <div>
              <button onClick={increase}>+</button>
              <span>{getQuantity}</span>
              <button onClick={decrease}>-</button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  function increase() {
    let quantity = getQuantity + 1;
    setQuantity(quantity);
    const product = {
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: quantity,
    };
    console.log(product)
    setCart((prevState) => {
      // Always create a new State from the old one, dont manipl the old one
      let newState = prevState;
      newState = newState.filter((elem) => {
        return elem.id !== product.id;
      });
      newState.push(product);
      return newState;
    });
  }

  function decrease() {
    let quantity = getQuantity - 1;
    setQuantity(quantity);
    const product = {
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: quantity,
    };
    setCart((prevState) => {
      let newState = prevState;
      newState = newState.filter((elem) => {
        return elem.id !== product.id;
      });
      newState.push(product);
      console.log(newState);
      return newState;
    });
  }
}
