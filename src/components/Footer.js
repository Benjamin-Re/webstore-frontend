import "../styles/Footer.css";
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialPinterest,
} from "react-icons/ti";

export function Footer() {
  const starStyle = {
    color: "gold",
    fontSize: "1.5rem",
    alignSelf: "center",
    width: "100%",
  };
  const lineStyle = {
    borderBottom: "3px solid gold",
    width: "250px",
    top: "-20px",
    position: "relative",
    alignSelf: "center",
  };
  return (
    <div className="footer">
      <div style={lineStyle}>
        {" "}
        <h2>Contact Us</h2>{" "}
      </div>
      <div className="footerWrapper">
        <div className="address">
          <div>Rodeo Drive, 90001, Los Angeles, CA</div>
          <div>shopping-art@gmail.com</div>
          <div>555-555-222-111</div>
        </div>
        <div className="verticalDivider"></div>
        <div className="social">
          <div>
            <TiSocialTwitter size={42} />
          </div>
          <div>
            <TiSocialFacebook size={42} />
          </div>
          <div>
            {" "}
            <TiSocialInstagram size={42} />
          </div>
          <div>
            {" "}
            <TiSocialPinterest size={42} />
          </div>
        </div>
      </div>
    </div>
  );
}
