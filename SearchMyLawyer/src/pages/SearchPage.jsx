import React from "react";
import { useState } from "react";

export default function SearchForm({ onSearch }) {
    const [city, setCity] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ city, specialization, experience });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded flex flex-wrap gap-4">
            <input
                type="text"
                placeholder="City"
                className="border p-2 rounded w-full md:w-1/4"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="text"
                placeholder="Specialization"
                className="border p-2 rounded w-full md:w-1/4"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
            />
            <input
                type="number"
                placeholder="Min Experience (Years)"
                className="border p-2 rounded w-full md:w-1/4"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Search
            </button>
        </form>
    );
}
