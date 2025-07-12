import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Lawyer Management System
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Find trusted lawyers, manage appointments, and access legal help quickly and efficiently.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={() => navigate("/search")}
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    🔍 Search Lawyers
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300"
                >
                    🔐 Login
                </button>

                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        onClick={() => navigate("/register/lawyer")}
                        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
                    >
                        🧑‍⚖️ Register as Lawyer
                    </button>

                    <button
                        onClick={() => navigate("/register/client")}
                        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
                    >
                        🙋 Register as Client
                    </button>
                </div>

            </div>

            <footer className="mt-12 text-sm text-gray-500">
                © {new Date().getFullYear()} Lawyer System. All rights reserved.
            </footer>
        </div>
    );
}
