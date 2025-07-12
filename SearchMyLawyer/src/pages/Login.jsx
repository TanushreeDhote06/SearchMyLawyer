import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Login
                </button>

                {error && <p className="mt-4 text-red-600">{error}</p>}
            </form>
        </div>
    );
}
