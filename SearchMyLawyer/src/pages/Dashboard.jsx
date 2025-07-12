import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => setUser(data))
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, []);

    if (!user) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <p className="mb-4">Role: {user.role}</p>

            {user.role === "lawyer" ? (
                <LawyerDashboard user={user} />
            ) : (
                <ClientDashboard user={user} />
            )}

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
            >
                Logout
            </button>
        </div>
    );
}

function LawyerDashboard({ user }) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Lawyer Panel</h3>
            <ul className="list-disc pl-5">
                <li>View and manage appointments</li>
                <li>Update lawyer profile</li>
                <li>Set availability</li>
            </ul>
        </div>
    );
}

function ClientDashboard({ user }) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Client Panel</h3>
            <ul className="list-disc pl-5">
                <li>See booked lawyers</li>
                <li>Track appointment status</li>
                <li>Leave reviews</li>
            </ul>
        </div>
    );
}
