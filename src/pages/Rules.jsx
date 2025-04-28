import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import '../css/rules.css';

export default function Rules() {
    return (
        <div className="page-container">
            <Header/>

            <main className="main-content">
                <h1>Règles</h1>

                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/4J82vNoxTRE"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </main>

            <Footer/>
        </div>

    );
}
