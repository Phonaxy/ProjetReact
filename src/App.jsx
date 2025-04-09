import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import NotFound from "./pages/NotFound.jsx";
import News from "./pages/News.jsx";
import './App.css'


export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/details" element={<Details/>} />
                <Route path="/news" element={<News/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    );
}
