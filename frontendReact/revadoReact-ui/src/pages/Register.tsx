import { useState } from "react";
import { registerUser } from "../services/authService";
import "./Login.css";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            await registerUser(name, email, password);
            setMessage("Registration successful");
        } catch (error) {
            console.error("Registration failed:", error);
            setMessage("Registration failed");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleRegister}>
                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br /><br />

                <button type="submit">Register</button>

                <p>{message}</p>
            </form>
            <p className="login-link">
                Don't have an account? <a href="/">Login here</a>
            </p>
        </div>
    );
}