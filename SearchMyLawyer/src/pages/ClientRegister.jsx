import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientRegister() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
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
            body: JSON.stringify({ ...form, role: "client" }),
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
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Client Register</h2>

                {["name", "email", "password", "phone"].map((field) => (
                    <div className="mb-4" key={field}>
                        <label className="block font-medium mb-1 capitalize">{field}</label>
                        <input
                            type={field === "password" ? "password" : "text"}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register as Client
                </button>
            </form>
        </div>
    );
}
