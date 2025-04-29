import React, { useState } from "react";
import "../css/navbar.css";

const Navbar = ({
                    onFilterChange,
                    editions,
                    types,
                    rarities,
                    colors,
                    attributes,
                    families,
                }) => {
    const [filters, setFilters] = useState({
        name: "",
        edition: "",
        type: "",
        rarity: "",
        color: "",
        attribute: "",
        family: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            name: "",
            edition: "",
            type: "",
            rarity: "",
            color: "",
            attribute: "",
            family: "",
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="navbar-news">
            <div className="filters">
                <input
                    type="text"
                    name="name"
                    placeholder="Rechercher par nom..."
                    value={filters.name}
                    onChange={handleChange}
                />
                <select name="edition" value={filters.edition} onChange={handleChange}>
                    <option value="">Toutes éditions</option>
                    {editions.map((e, i) => (
                        <option key={i} value={e}>{e}</option>
                    ))}
                </select>
                <select name="type" value={filters.type} onChange={handleChange}>
                    <option value="">Tous types</option>
                    {types.map((t, i) => (
                        <option key={i} value={t}>{t}</option>
                    ))}
                </select>
                <select name="rarity" value={filters.rarity} onChange={handleChange}>
                    <option value="">Toutes raretés</option>
                    {rarities.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                    ))}
                </select>
                <select name="color" value={filters.color} onChange={handleChange}>
                    <option value="">Toutes couleurs</option>
                    {colors.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>
                <select name="attribute" value={filters.attribute} onChange={handleChange}>
                    <option value="">Tous attributs</option>
                    {attributes.map((a, i) => (
                        <option key={i} value={a}>{a}</option>
                    ))}
                </select>
                <select name="family" value={filters.family} onChange={handleChange}>
                    <option value="">Toutes familles</option>
                    {families.map((f, i) => (
                        <option key={i} value={f}>{f}</option>
                    ))}
                </select>

                <button onClick={handleReset} className="filter-btn reset-btn">
                    Réinitialiser
                </button>
            </div>
        </div>
    );
};

export default Navbar;
