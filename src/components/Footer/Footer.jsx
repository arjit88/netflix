import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={facebook_icon} alt="facebook_icon" />
        <img src={instagram_icon} alt="instagram_icon" />
        <img src={twitter_icon} alt="twitter_icon" />
        <img src={youtube_icon} alt="youtube_icon" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notice</li>
        <li>Cookie Preference</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <Link className="link" target="_blank" to={"https://github.com/arjit88"}>
        Made by Arjit Anand
      </Link>
      <p className="copyright-text">&copy; 1997-2024 Arjit, Inc.</p>
    </div>
  );
};

export default Footer;
