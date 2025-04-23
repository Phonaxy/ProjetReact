import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import homeVideo from '../assets/home.mp4';
import '../css/style.css';

function Home() {
    return (
        <div className="home-container">
            <Header />
            <main className="main-content">
                <div className="video-background">
                    <video autoPlay loop muted playsInline className="video-bg">
                        <source src={homeVideo} type="video/mp4"/>
                        Votre navigateur ne supporte pas la vidéo HTML5.
                    </video>
                    <div className="video-overlay"></div>
                </div>

                <div className="video-overlay-content">
                    <h1>Bienvenue</h1>
                    <p>Explore notre collection</p>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
