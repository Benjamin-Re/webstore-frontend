import "../styles/Card.css";
import { useMyContext } from "../Context";


export function Card(props) {
  const {cart, getQuantity, increase, decrease} = useMyContext();
  const [getCart, setCart] = cart;
  const quantity = getQuantity(props._id);
  
  return (
    <>
      <div className="card" id={props._id}>
        <div className="upper"><img src={"https://enigmatic-temple-40493.herokuapp.com/products/"+props.imgSrc} alt="depiction of product"></img></div>
        <div className="lower">
          <div className="article">
            <div>{props.name}</div> <div>{props.price}€</div>
          </div>
          {props.stock < 1 ? (<div>Sold Out</div>) : (
            <div className="buttonSection">
            {quantity === 0 ? (
              <button onClick={addToCart}>Add to Cart</button>
            ) : (
              <div>
                <button className="plusMinus" onClick={()=>{decrease(props._id)}} >-</button>
                <span>{quantity}</span>
                <button className="plusMinus" onClick={()=>{increase(props._id, props.stock)}} >+</button>
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
        _id: props._id,
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
