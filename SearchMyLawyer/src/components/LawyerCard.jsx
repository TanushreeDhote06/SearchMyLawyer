import React from "react";
export default function LawyerCard({ lawyer }) {
    return (
        <div className="border p-4 rounded shadow-md bg-white">
            <h2 className="text-xl font-semibold">{lawyer.name}</h2>
            <p className="text-sm text-gray-600">{lawyer.specialization} | {lawyer.city}</p>
            <p>Experience: {lawyer.experience} years</p>
            <p>Rating: ⭐ {lawyer.rating}</p>
            <p className="text-gray-700 mt-2">{lawyer.bio}</p>
        </div>
    );
}
