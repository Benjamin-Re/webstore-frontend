import css from './card.css';
import { useMyContext } from '../Context';
import { useState } from 'react';

export function Card(props) {
  const {cart, logged, token} = useMyContext();
  const [getCart, setCart] = cart;
  const [getQuantity, setQuantity] = useState(0);
  
  return (
    <>
      <div className="card" id={props.id}>
        <div className="upper"></div>
        <div className="lower">
            {props.name}, {props.price}€
            {getQuantity === 0 ? (
              <button onClick={increase}>Add to Cart</button>
            ) : <div>
              <button onClick={increase}>+</button>
              <span>{getQuantity}</span>
              <button onClick={decrease}>-</button>
              <button onClick={clickHandler}>Add</button>
            </div>
            }
            
        </div>
      </div>
    </>
  );

  function increase() {
    setQuantity(getQuantity+1)
  }

  function decrease() {
    setQuantity(getQuantity-1)
  }

  function clickHandler(e){
    console.log(`Clicked on ${props.id}`);
    const product = {
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: getQuantity,
    }
    setCart((oldArray) => [...oldArray, product]);
  }
}

