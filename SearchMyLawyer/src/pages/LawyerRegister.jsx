// src/pages/Register.jsx
import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LawyerRegister() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        specialization: "",
        experience: "",
        bio: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, role: "lawyer" }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } else {
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Lawyer Register</h2>

                {[
                    { label: "Name", name: "name" },
                    { label: "Email", name: "email" },
                    { label: "Password", name: "password", type: "password" },
                    { label: "Phone", name: "phone" },
                    { label: "City", name: "city" },
                    { label: "Specialization", name: "specialization" },
                    { label: "Experience (in years)", name: "experience" },
                ].map(({ label, name, type = "text" }) => (
                    <div className="mb-4" key={name}>
                        <label className="block font-medium mb-1">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                ))}

                <div className="mb-4">
                    <label className="block font-medium mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
