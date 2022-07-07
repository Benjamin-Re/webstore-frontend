import '../styles/Footer.css';
import { TiSocialTwitter, TiSocialFacebook, TiSocialGithub, TiSocialInstagram, TiSocialYoutube, TiSocialLinkedin } from 'react-icons/ti';
export function Footer(){
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
        <div className="footer">
            <div style={lineStyle}> <h2>Contact Us</h2> </div>
            <div className="address">
                <div>Rodeo Drive, 90001, Los Angeles, CA</div>
                <div>shopping-art@gmail.com</div>
                <div>555-555-222-111</div>
            </div>
            <div className="social">
                <div><TiSocialTwitter/></div>
                <div><TiSocialFacebook/></div>
                <div><TiSocialGithub/></div>
               <div> <TiSocialInstagram/></div>
               <div> <TiSocialYoutube/></div>
                <div><TiSocialLinkedin/></div>
            </div>
        </div>
    )
}