import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';
import FacebookLogo from '../assets/footer/Facebook.png';
import TwitterLogo from '../assets/footer/Twitter.png';
import YoutubeLogo from '../assets/footer/Youtube.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={FacebookLogo} alt="Facebook" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={TwitterLogo} alt="Twitter" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <img src={YoutubeLogo} alt="YouTube" />
                </a>
            </div>
            <ul className="footer-links">
                <li><Link to="/">Cookie settings</Link></li>
                <li><Link to="/">Pour toutes question</Link></li>
            </ul>
        </footer>
    );
};

export default Footer;
