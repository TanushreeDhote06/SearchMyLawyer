import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "client",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Auto-login after signup
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="client">Register as Client</option>
                    <option value="lawyer">Register as Lawyer</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 cursor-pointer underline"
                    >
                        Login here
                    </span>
                </p>
            </form>
        </div>
    );
}
