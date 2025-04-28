import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import "../css/details.css";
import "../css/aura.css";
import "../css/pagination.css";

const Details = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(false);
                const response = await fetch(`/api/api/one-piece/cards?page=${currentPage}&limit=20`, {
                    headers: {
                        "x-api-key": "eed72a5d1b38bc12224563f168a09598a12403d84f50363eda98d06d56ebb3b2"
                    }
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setCards(data.data);
                setLoading(true);
            } catch (error) {
                console.error("Failed to fetch cards:", error);
            }
        };

        fetchCards();
    }, [currentPage]);

    return (
        <div>
            <Header />
            <h1 className="title-details">Liste des Cartes</h1>

            {!loading ? (
                <div className="loader-wrapper">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="card-grid">
                        {cards.map((card) => (
                            <div key={card.id} className={`card-item aura-${card.color?.toLowerCase() || "default"}`}>
                                <span className="particle"></span>
                                <span className="particle"></span>
                                <span className="particle"></span>
                                <span className="particle"></span>

                                <button className="card-button" aria-label={`Afficher la carte ${card.name}`}>
                                    <img src={card.images.large} alt={card.name} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/*Affichage de la pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}

            <Footer/>
        </div>
    );
};

export default Details;
