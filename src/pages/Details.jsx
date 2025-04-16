import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_KEY = "7c51ce5f51b2a0e2bb3bf45b2afaa9ae";
const BASE_URL = "https://api.themoviedb.org/3";


function Details() {
    return (
        <div>
            <Header/>
            <h1>Details</h1>
            <Footer/>
        </div>
    );
}

export default Details;
