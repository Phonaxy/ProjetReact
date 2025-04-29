import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../css/cardinfo.css"; // You will create it after

const CardInfo = () => {
    const location = useLocation();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    // ✅ Extract the card name from the URL
    const searchParams = new URLSearchParams(location.search);
    const cardName = searchParams.get("card");

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/api/one-piece/cards?page=1&limit=1000`, {
                    headers: {
                        "x-api-key": "eed72a5d1b38bc12224563f168a09598a12403d84f50363eda98d06d56ebb3b2"
                    }
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                // ✅ Find the card by its name
                const foundCard = data.data.find(c => c.name.toLowerCase() === cardName.toLowerCase());

                if (foundCard) {
                    setCard(foundCard);
                } else {
                    console.error("Card not found");
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch card:", error);
                setLoading(false);
            }
        };

        fetchCardData();
    }, [cardName]);

    if (loading) {
        return (
            <div>
                <Header />
                <div className="loader-wrapper">
                    <Loader />
                </div>
                <Footer />
            </div>
        );
    }

    if (!card) {
        return (
            <div>
                <Header />
                <h2 style={{ textAlign: "center", margin: "100px 0" }}>Card not found 😢</h2>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="cardinfo-container">
                <div className="cardinfo-back">
                    <button onClick={handleBack}>← Retour</button>
                </div>

                <div className="cardinfo-card">
                    <div className="cardinfo-image-wrapper">
                        <img src={card.images.large} alt={card.name} className="cardinfo-image"/>
                    </div>
                    <div className="cardinfo-details">
                        <h1>{card.name}</h1>
                        <p><strong>Rarity:</strong> {card.rarity}</p>
                        <p><strong>Type:</strong> {card.type}</p>
                        <p><strong>Power:</strong> {card.power}</p>
                        <p><strong>Color:</strong> {card.color}</p>
                        <p><strong>Family:</strong> {card.family}</p>
                        <p><strong>Ability:</strong> <span dangerouslySetInnerHTML={{__html: card.ability}}/></p>
                        {card.trigger && <p><strong>Trigger:</strong> {card.trigger}</p>}
                        <p><strong>Set:</strong> {card.set.name}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

};

export default CardInfo;
