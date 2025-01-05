import { useState } from "react";
import { loginUser } from "../componants/loginUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setMessage("Login successful!");
      router("/");
    } catch (error) {
      setMessage(error.message);
    }
  };
  const handleReg = async (e) => {
    e.preventDefault();
    try {
      router("/registration");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md bg-white shadow-md rounded-lg p-6" onSubmit={handleLogin}>
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        <p className="mt-4 text-gray-700">{message}</p>
        <button type="button" onClick={handleReg}>Register</button>
      </form>
    </div>
  );
}
