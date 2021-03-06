import { Link } from "react-router-dom";
import "../styles/Home.css";
import { AiFillStar } from "react-icons/ai";


export function Home() {
  const starStyle = {
    color: "gold",
    fontSize: "1.5rem",
  }
  const lineStyle = {
    borderBottom: "3px solid gold",
    width: "250px",
    top: "-20px",
    position: "relative",
    alignSelf: "center"
  }

  return (
    <div className="homeContainer">
      {/*Section 1*/}
      <div id="section1">
        <div className="top">
          <h2 className="heroText">
            We don't sell art,<br></br> we are art
          </h2>
          <Link to="/products">
          <button className="callToAction">
            Shop now
          </button>
          </Link>
        </div>
      </div>
      {/*Section 2*/}
      <div id="section2">
      <h2>What our customers think</h2>
        <div style={lineStyle}></div>
        <div className="customerCard">
          <img src="https://enigmatic-temple-40493.herokuapp.com/home/customer1.jpg" alt="customer"></img>
          <div className="customerVoice">
            <h1>My all time favourite store</h1>I buy here all the time. You
            should too, if you want the best value for your money. <br></br>
            <AiFillStar style={starStyle}/><AiFillStar style={starStyle}/><AiFillStar style={starStyle}/><AiFillStar style={starStyle}/><AiFillStar style={starStyle}/>
            <br></br>
            - Cassandra Styles <br></br>
            Michigan, TX
          </div>
        </div>
        <div className="customerCard">
          <div className="customerVoice">
            <h1>Even better than my expectations</h1>These guys never let me
            down. The products I order are high quality, always arrive on time
            and on top of all - the shipping is free. Finally I can focus on my
            art. <br></br>
            <AiFillStar style={starStyle}/><AiFillStar style={starStyle}/><AiFillStar style={starStyle}/><AiFillStar style={starStyle}/><AiFillStar style={starStyle}/>
            <br></br>
            - John Powers <br></br>
            Los Angeles, CA
          </div>
          <img src="https://enigmatic-temple-40493.herokuapp.com/home/customer2.jpg" alt="customer"></img>
        </div>
      </div>
      {/*Section 3*/}
      <div id="section3">
        <div style={lineStyle}><h2>Our Materials</h2></div>
        <div className="materials">
        <div className="sec3Card">
          <img src="https://enigmatic-temple-40493.herokuapp.com/home/brushes.jpg" alt="depiction of material"></img>
          <div><h2>Durable</h2>Our materials are of the highest quality standards.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum pretium varius. 
          </div>
        </div>
        <div className="sec3Card">
          <img src="https://enigmatic-temple-40493.herokuapp.com/home/canvas.jpg" alt="depiction of material"></img>
          <div><h2>Sustainable</h2>Our materials are of the highest quality standards
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum pretium varius. 
          </div>
        </div>
        <div className="sec3Card">
          <img src="https://enigmatic-temple-40493.herokuapp.com/home/paint.jpg" alt="depiction of material"></img>
          <div><h2>Design</h2>Our materials are of the highest quality standards
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum pretium varius. 
          </div>
        </div>
        </div>
      </div>
      
    </div>
  );
}
