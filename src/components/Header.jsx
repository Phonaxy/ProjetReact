import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';
import Logo from '../assets/header/op_logo_1.png';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="Logo"/>
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/details">Liste des cartes</Link>
                <Link to="/news">Actualités</Link>
                <a href="https://example.com/regles" target="_blank" rel="noopener noreferrer">Règles</a>
            </nav>
        </header>
    );
};

export default Header;
