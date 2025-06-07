import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios.get(apiUrl)
      .then((response) => {
        setLoading(false);
        const users = response.data;

        const matchedUser = users.find(user =>
          user.username === username && user.password === password
        );

        if (matchedUser) {
          alert(`Welcome, ${matchedUser.username}!`);
          localStorage.setItem("user", JSON.stringify(matchedUser));
        } else {
          setError("Invalid username or password");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to fetch users. Please try again.");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;