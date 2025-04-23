import Header from "../components/Header";
import Footer from "../components/Footer";
import NavbarNews from "../components/NavbarNews";
import "../css/style.css";
import "../css/newsNavbar.css";

import img1 from "../assets/news/op1.jpg";
import img2 from "../assets/news/op2.jpg";
import img4 from "../assets/news/op4.jpg";
import img5 from "../assets/news/op5.jpg";
import img6 from "../assets/news/op6.jpg";
import img7 from "../assets/news/op7.jpg";
import img8 from "../assets/news/op8.jpg";

const newsItems = [
    { title: "Sortie édition française", subtitle: "Le début est proche", image: img1 },
    { title: "Luffy fait son retour", subtitle: "Le début est proche", image: img2 },
    { title: "Nouveau booster", subtitle: "Le début est proche", image: img2 },
    { title: "Label", subtitle: "Le début est proche", image: img4 },
    { title: "Édition collector", subtitle: "Le début est proche", image: img5 },
    { title: "Boîte de jeu", subtitle: "Le début est proche", image: img6 },
    { title: "Nouveaux personnages", subtitle: "Le début est proche", image: img7 },
    { title: "Mise à jour des règles", subtitle: "Le début est proche", image: img8 },
];

function News() {
    return (
        <div>
            <Header />
            <NavbarNews />
            <div className="news-container">
                {newsItems.map((item, index) => (
                    <div className="card" key={index}>
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default News;
