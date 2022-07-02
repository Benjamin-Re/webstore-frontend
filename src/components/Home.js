import { Link } from "react-router-dom";
import css from "../styles/Home.css";

export function Home() {
  return (
    <div className="homeContainer">
      <div class="section1">
        <h2>
          We don't sell art,<br></br> we are art
        </h2>
        <Link className="bigLink" to="/products">
          Shop now
        </Link>
        <div>What our customer's think</div>
      </div>
      <div className="section2">
        <div className="customerCard">
          <img src="/img/customer1.jpg" alt="customer"></img>
          <div className="customerVoice">
            <h1>My all time favourite store</h1>I buy here all the time. You
            should too, if you want the best value for your money
          </div>
        </div>
        <div className="customerCard">
          <div className="customerVoice">
            <h1>Even better than my expectations</h1>These guys never let me down. The products I order
            are high quality, always arrive on time and on top of all - the shipping is free.
            Finally I can focus on my art.
          </div>
          <img src="/img/customer2.jpg" alt="customer"></img>
        </div>
      </div>
    </div>
  );
}
