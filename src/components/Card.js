import css from './card.css';
import { useSetCart } from '../Context';

export function Card(props) {
  const setCart = useSetCart();
 
  
  return (
    <>
      <div className="card" id={props.id}>
        <div className="upper"></div>
        <div className="lower">
            {props.name}, {props.price}€
            <button onClick={clickHandler}>Add</button>
        </div>
      </div>
    </>
  );

  function clickHandler(e){
    console.log(`Clicked on ${props.id}`);
    const product = {
      id: props.id,
      name: props.name,
      price: props.price
    }
    setCart(product);
  }
}

