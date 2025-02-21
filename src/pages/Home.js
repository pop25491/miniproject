import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <div style={styles.container}>
      {/* ✅ CSS Animation */}
      <style>
        {`
        @keyframes neonPulse {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(50vh) scale(1.5); opacity: 0.6; }
          100% { transform: translateY(100vh) scale(1); opacity: 1; }
        }
  
        @keyframes waveAnimation {
          0% { transform: translateX(-100vw) rotate(45deg); opacity: 1; }
          100% { transform: translateX(100vw) rotate(45deg); opacity: 0; }
        }
  
        .neonLight {
          position: absolute;
          width: 10px;
          height: 50px;
          background: linear-gradient(45deg, #ff4e50, #f9d423);
          opacity: 0.8;
          animation: waveAnimation 5s linear infinite;
          filter: blur(2px);
          border-radius: 5px;
        }
  
        .neonLight:nth-child(even) {
          background: linear-gradient(45deg, #00c6ff, #0072ff);
          animation-duration: 6s;
        }
        `}
      </style>
  
      {/* ✅ แสงไฟนีออน */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="neonLight" style={{
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 3}s`,
        }}></div>
      ))}
  
      <motion.div
        style={styles.homeBox}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={styles.title}>Welcome to MyShop</h1>
        <p style={styles.subtitle}>Your one-stop shop for amazing products at unbeatable prices.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/products" style={styles.button}>🛒 Start Shopping</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: '#121212',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: '20px',
  },
  homeBox: {
    textAlign: 'center',
    color: '#fff',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    letterSpacing: '1px',
    color: '#fff',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#fff',
    opacity: 0.8,
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#fff',
    padding: '10px 20px',
    color: '#121212',
    fontSize: '1.2rem',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: '0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Home;
