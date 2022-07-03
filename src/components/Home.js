import { Link } from "react-router-dom";
import css from "../styles/Home.css";

export function Home() {
  return (
    <div className="homeContainer">

      {/*Section 1*/}
      <div id="section1">
        <div className="top">
          <h2>
            We don't sell art,<br></br> we are art
          </h2>
          <button className="bigLink">
          <Link to="/products">
            Shop now
          </Link>
          </button>
        </div>
        <div className="sec2Intro">What our customer's think</div>
      </div>
      {/*Section 2*/}
      <div id="section2">
        <div className="customerCard">
          <img src="/img/customer1.jpg" alt="customer"></img>
          <div className="customerVoice">
            <h1>My all time favourite store</h1>I buy here all the time. You
            should too, if you want the best value for your money
            ⭐⭐⭐⭐⭐
          </div>
        </div>
        <div className="customerCard">
          <div className="customerVoice">
            <h1>Even better than my expectations</h1>These guys never let me
            down. The products I order are high quality, always arrive on time
            and on top of all - the shipping is free. Finally I can focus on my
            art.
            ⭐⭐⭐⭐⭐
          </div>
          <img src="/img/customer2.jpg" alt="customer"></img>
        </div>
      </div>
      {/*Section 3*/}
      <div id="section3">
        <div className="sec3Card">
          <img src="/img/brushes.jpg" alt="image of material"></img>
          <div>Our materials are of the highest quality standards.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum pretium varius. Pellentesque lobortis tellus at sapien dapibus, vel tempor nisi blandit. Integer eu accumsan arcu. Nunc placerat metus id porttitor varius. Nullam ultricies efficitur porttitor. Aliquam facilisis varius eleifend. Sed eleifend, magna ut mattis pretium, lorem neque laoreet massa, eget finibus lorem massa sit amet felis.
          </div>
        </div>
        <div className="sec3Card">
          <img src="/img/canvas.jpg" alt="image of material"></img>
          <div>Our materials are of the highest quality standards
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum pretium varius. Pellentesque lobortis tellus at sapien dapibus, vel tempor nisi blandit. Integer eu accumsan arcu. Nunc placerat metus id porttitor varius. Nullam ultricies efficitur porttitor. Aliquam facilisis varius eleifend. Sed eleifend, magna ut mattis pretium, lorem neque laoreet massa, eget finibus lorem massa sit amet felis.
          </div>
        </div>
        <div className="sec3Card">
          <img src="/img/paint.jpg" alt="image of material"></img>
          <div>Our materials are of the highest quality standards
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum pretium varius. Pellentesque lobortis tellus at sapien dapibus, vel tempor nisi blandit. Integer eu accumsan arcu. Nunc placerat metus id porttitor varius. Nullam ultricies efficitur porttitor. Aliquam facilisis varius eleifend. Sed eleifend, magna ut mattis pretium, lorem neque laoreet massa, eget finibus lorem massa sit amet felis.
          </div>
        </div>
      </div>
    </div>
  );
}
