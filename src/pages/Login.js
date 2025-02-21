import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                login(data.token);
                localStorage.setItem("cusid",data.CustomerID);
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("❌ Login failed. Try again.");
        }
    };

    return (
        <div style={styles.container}>
          {/* ✅ CSS Animation */}
          <style>
            {`
            @keyframes glowingAnimation {
              0% { transform: translateY(0) scale(1); opacity: 0.8; }
              50% { transform: translateY(50vh) scale(1.5); opacity: 0.5; }
              100% { transform: translateY(100vh) scale(1); opacity: 0.8; }
            }
      
            .glow {
              position: absolute;
              width: 10px;
              height: 10px;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 50%;
              animation: glowingAnimation 4s ease-in-out infinite;
            }
            `}
          </style>
      
          {/* ✅ แสงเรืองแสง */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="glow" style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`,
            }}></div>
          ))}
      
          <motion.div
            style={styles.loginBox}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={styles.title}>Sign In</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin}>
              <div style={styles.inputContainer}>
                <input 
                  type="email" 
                  placeholder="Email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputContainer}>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  style={styles.input}
                />
              </div>
              <motion.button 
                type="submit"
                style={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, backgroundColor: "#6c48d3" }}
              >
                Sign In
              </motion.button>
            </form>
            <p style={styles.signupText}>
              New here? <a href="/register" style={styles.link}>Sign up now</a>
            </p>
          </motion.div>
        </div>
      );
};

const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#121212',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '20px',
    },
    loginBox: {
      textAlign: 'center',
      color: '#fff',
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#fff',
    },
    error: {
      color: '#ff4747',
      fontSize: '1rem',
      marginBottom: '10px',
    },
    inputContainer: {
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid #fff',
      backgroundColor: '#333',
      color: '#fff',
      outline: 'none',
      transition: 'border 0.3s ease',
    },
    button: {
      display: 'inline-block',
      padding: '12px 30px',
      fontSize: '1.2rem',
      borderRadius: '6px',
      backgroundColor: '#fff',
      color: '#121212',
      border: 'none',
      cursor: 'pointer',
      transition: '0.3s ease',
    },
    signupText: {
      marginTop: '20px',
      color: '#fff',
      fontSize: '1rem',
    },
    link: {
      color: '#6c48d3',
      textDecoration: 'none',
    },
  };

export default Login;
