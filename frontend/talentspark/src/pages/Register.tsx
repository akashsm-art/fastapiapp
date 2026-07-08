import { useState } from "react";
import { register } from "../services/AuthService";

type Props = {
  onSwitchToLogin: () => void;
};

function Register({ onSwitchToLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password, role });
      alert("Registration successful! Please login.");
      onSwitchToLogin();
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🌱</span>
          <h2>Join TalentSpark</h2>
          <p className="auth-subtitle">Create your account to get started</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="input-icon">📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="input-icon">💼</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#f3f4f6",
                fontSize: "14px",
                outline: "none",
                appearance: "none",
                cursor: "pointer"
              }}
            >
              <option value="" disabled style={{ backgroundColor: "#1e1e24", color: "#9ca3af" }}>Select Role</option>
              <option value="candidate" style={{ backgroundColor: "#1e1e24", color: "#f3f4f6" }}>Candidate (Job Seeker)</option>
              <option value="hr" style={{ backgroundColor: "#1e1e24", color: "#f3f4f6" }}>HR Specialist</option>
              <option value="admin" style={{ backgroundColor: "#1e1e24", color: "#f3f4f6" }}>Administrator</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            🌿 Create Account
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToLogin}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;