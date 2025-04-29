import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import "../css/details.css";
import "../css/pagination.css";

const Details = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const cardsPerPage = 20;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(false);
                const response = await fetch(`/api/api/one-piece/cards?page=1&limit=1000`, {
                    headers: {
                        "x-api-key": "eed72a5d1b38bc12224563f168a09598a12403d84f50363eda98d06d56ebb3b2"
                    }
                });

                if (!response.ok) throw new Error("Erreur réseau");

                const data = await response.json();
                setCards(data.data);
                setFilteredCards(data.data);
                setLoading(true);
            } catch (error) {
                console.error("Erreur chargement cartes :", error);
            }
        };

        fetchCards();
    }, []);

    const getUnique = (keyFn) =>
        [...new Set(cards.map(keyFn).filter(Boolean))].sort();

    const editions = getUnique((card) => card.set?.name);
    const types = getUnique((card) => card.type);
    const rarities = getUnique((card) => card.rarity);
    const colors = getUnique((card) => card.color);
    const attributes = getUnique((card) => card.attribute?.name);
    const rawFamilies = cards
        .flatMap(card => card.family?.split("/").map(f => f.trim()) || []);
    const families = [...new Set(rawFamilies)].sort();

    const handleFilterChange = (filters) => {
        const filtered = cards.filter((card) => {
            const matchName = filters.name ? card.name?.toLowerCase().includes(filters.name.toLowerCase()) : true;
            const matchEdition = filters.edition ? card.set?.name === filters.edition : true;
            const matchType = filters.type ? card.type === filters.type : true;
            const matchRarity = filters.rarity ? card.rarity === filters.rarity : true;
            const matchColor = filters.color ? card.color === filters.color : true;
            const matchAttr = filters.attribute ? card.attribute?.name === filters.attribute : true;
            const matchFamily = filters.family
                ? card.family?.toLowerCase().includes(filters.family.toLowerCase())
                : true;

            return matchName && matchEdition && matchType && matchRarity && matchColor && matchAttr && matchFamily;
        });

        setFilteredCards(filtered);
        setCurrentPage(1);
    };

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    const handleCardClick = (cardName) => {
        const encodedName = encodeURIComponent(cardName);
        navigate(`/cardinfo?card=${encodedName}`);
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
                            {currentCards.length > 0 ? (
                                currentCards.map((card) => (
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
                                onPageChange={setCurrentPage}
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
