import React from "react";
import "../css/newsNavbar.css";

const categories = [
    "Tout",
    "Produit",
    "Evenement",
    "Autre",
    "Jeu organisé",
    "Promotion",
];

const NavbarNews = () => {
    return (
        <div className="navbar-news">
            <h1 className="title-news">Actualités</h1>
            <div className="filters">
                {categories.map((cat, index) => (
                    <button className="filter-btn" key={index}>{cat}</button>
                ))}
                <div className="search-container">
                    <input type="text" placeholder="Rechercher" />
                    <span className="search-icon">🔍</span>
                </div>
            </div>
        </div>
    );
};

export default NavbarNews;
