import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../css/details.css";
import "../css/aura.css";


const Details = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false); // état du loader

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch("/api/api/one-piece/cards?page=1&limit=80", {
                    headers: {
                        "x-api-key": "eed72a5d1b38bc12224563f168a09598a12403d84f50363eda98d06d56ebb3b2"
                    }
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setCards(data.data);
                setLoading(true); // ✅ données prêtes, on désactive le loader
            } catch (error) {
                console.error("Failed to fetch cards:", error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div>
            <Header />
            <h1>Liste des Cartes</h1>

            {/* ✅ Loader en attendant */}
            {!loading ? (
                <div className="loader-wrapper">
                    <Loader />
                </div>
            ) : (
                <div className="card-grid">
                    {cards.map((card) => (

                        <div key={card.id} className={`card-item aura-${card.color?.toLowerCase() || "default"}`}>
                            {/* ✨ Floating dots */}
                            <span className="particle"></span>
                            <span className="particle"></span>
                            <span className="particle"></span>
                            <span className="particle"></span>

                            <button className="card-button" aria-label={`Afficher la carte ${card.name}`}>
                                <img src={card.images.large} alt={card.name}/>
                            </button>
                        </div>


                    ))}
                </div>
            )}

            <Footer/>
        </div>
    );
};

export default Details;
