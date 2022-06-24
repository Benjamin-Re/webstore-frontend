import { useMyContext } from "../Context";

export function Cart() {

  const {cart, logged, token} = useMyContext();
  const [getCart, setCart] = cart;
  const products = getCart; // get cart is not a function but a variable

  return (
    <>
      <h2>Cart</h2>
      <ul>
      {products.map(product => {
        return (
            <li>
                {product.name}, {product.price}€
            </li>
        )
      })}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );
  
  function handleCheckout(){
      /* Many things:
      check if user logged in
      if so send
          put request to update products in db
          send post request to update orders in db
          get request to get the order and display order confirmation*/
      
      // Prepare the order
      let order = {
        "products": products,
        "total": products.reduce((total, current) => {return total+= current.price}, 0)
      }
      // Current user's id
      let userId = "62b0b711f370adbebfa75135";

      // Put request to user, to add the order to him
      fetch('https://enigmatic-temple-40493.herokuapp.com/users/'+userId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      }).then(res => {
        return res.json()
      }).then(data => console.log(data))
      .catch(error => console.log(error))
  }
}

