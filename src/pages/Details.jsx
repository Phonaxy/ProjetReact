import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import "../css/details.css";
import "../css/pagination.css";

const Details = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const cardsPerPage = 20;

    // Prendre en compte la page depuis l'URL au premier chargement
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get("page")) || 1;
        setCurrentPage(pageFromUrl);
    }, []);

    const fetchCards = async (page = 1, filters = {}) => {
        try {
            setLoading(false);
            let query = `/api/api/one-piece/cards?page=${page}&limit=${cardsPerPage}`;

            const response = await fetch(query, {
                headers: {
                    "x-api-key": "eed72a5d1b38bc12224563f168a09598a12403d84f50363eda98d06d56ebb3b2"
                }
            });

            if (!response.ok) throw new Error("Erreur réseau");

            const data = await response.json();
            setCards(data.data);
            setTotalPages(Math.ceil(data.total / cardsPerPage));
            setLoading(true);
        } catch (error) {
            console.error("Erreur chargement cartes :", error);
        }
    };

    useEffect(() => {
        fetchCards(currentPage, filters);
    }, [currentPage, filters]);

    const [allCards, setAllCards] = useState([]);
    useEffect(() => {
        const fetchAllCards = async () => {
            try {
                const res = await fetch(`/api/api/one-piece/cards?page=1&limit=1000`, {
                    headers: {
                        "x-api-key": "eed72a5d1b38bc12224563f168a09598a12403d84f50363eda98d06d56ebb3b2"
                    }
                });
                const data = await res.json();
                setAllCards(data.data);
            } catch (err) {
                console.error("Erreur récupération filtres", err);
            }
        };

        fetchAllCards();
    }, []);

    const getUnique = (keyFn) =>
        [...new Set(allCards.map(keyFn).filter(Boolean))].sort();

    const editions = getUnique((card) => card.set?.name);
    const types = getUnique((card) => card.type);
    const rarities = getUnique((card) => card.rarity);
    const colors = getUnique((card) => card.color);
    const attributes = getUnique((card) => card.attribute?.name);
    const rawFamilies = allCards
        .flatMap(card => card.family?.split("/").map(f => f.trim()) || []);
    const families = [...new Set(rawFamilies)].sort();

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Revenir à la première page après filtrage
    };

    const handleCardClick = (cardName) => {
        const encodedName = encodeURIComponent(cardName);
        navigate(`/cardinfo?card=${encodedName}&page=${currentPage}`);
    };

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <h1 className="title-details">Liste des Cartes</h1>

                <Navbar
                    onFilterChange={handleFilterChange}
                    editions={editions}
                    types={types}
                    rarities={rarities}
                    colors={colors}
                    attributes={attributes}
                    families={families}
                />

                {!loading ? (
                    <div className="loader-wrapper">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="card-grid">
                            {cards.length > 0 ? (
                                cards.map((card) => (
                                    <div key={card.id} className={`card-item aura-${card.color?.toLowerCase() || "default"}`}>
                                        <span className="particle"></span>
                                        <span className="particle"></span>
                                        <span className="particle"></span>
                                        <span className="particle"></span>

                                        <button
                                            className="card-button"
                                            aria-label={`Afficher la carte ${card.name}`}
                                            onClick={() => handleCardClick(card.name)}
                                        >
                                            <img src={card.images.large} alt={card.name} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="no-results">Aucune carte trouvée.</p>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => {
                                    setCurrentPage(page);
                                    navigate(`/details?page=${page}`);
                                }}
                            />
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Details;
