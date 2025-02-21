import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", { fullName, email, password });
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("❌ Error registering. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
  
        @keyframes meteorAnimation {
          0% { transform: translateY(-100vh) translateX(50vw) rotate(45deg); opacity: 1; }
          100% { transform: translateY(100vh) translateX(-50vw) rotate(45deg); opacity: 0; }
        }
  
        .meteor {
          position: absolute;
          width: 3px;
          height: 40px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 0.7;
          filter: blur(1px);
          animation: meteorAnimation 2s linear infinite;
        }
        `}
      </style>
      {/* ⭐ Meteor Effect */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="meteor" style={{
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 2}s`,
        }}></div>
      ))}
  
      <motion.div
        style={styles.registerBox}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

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
  registerBox: {
    textAlign: 'center',
    color: '#fff',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
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
    backgroundColor: '#25293C',
    color: '#fff',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  button: {
    display: 'inline-block',
    padding: '12px 30px',
    fontSize: '1.2rem',
    borderRadius: '6px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

export default Register;
