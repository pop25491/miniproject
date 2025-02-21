import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const Products = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token = localStorage.getItem("token");
    const cusid = localStorage.getItem("cusid");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/products", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setProducts(res.data.products))
        .catch(() => setError("Unauthorized access. Please login."));
    }, [token]);

    const handleQuantityChange = (productID, value) => {
        setQuantity((prev) => ({ ...prev, [productID]: value }));
    };

    const handleAddToCart = async (product) => {
        // add cart
        addToCart(product);
        const selectedQuantity = quantity[product.ProductID] || 1;
        try {
            const cartData = { 
                ProductID: product.ProductID, 
                Quantity: selectedQuantity, 
                CustomerID: cusid // เปลี่ยนเป็นค่าที่ดึงจาก Auth ได้ถ้าต้องการ
            };

            console.log("📦 Adding to Cart:", cartData);

            const response = await axios.post(
                "http://localhost:5000/api/cart",
                cartData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.status === "success") {
                setSuccess("✅ Item added to cart!");
                setTimeout(() => navigate("/cart"), 1000); // ✅ นำทางไปยัง Cart หลังจากเพิ่มสำเร็จ
            } else {
                setError("❌ Failed to add item to cart.");
            }
        } catch (err) {
            setError("❌ Error adding item to cart.");
        }

        setTimeout(() => {
            setSuccess("");
            setError("");
        }, 2000);
    };

    return (
        <motion.div 
          className="container my-5 p-4 rounded shadow-lg"
          style={{ background: "#121212", color: "white" }} 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-warning fw-bold mb-4">🛍 Our Products</h2>
      
          {success && <p className="alert alert-success text-center">{success}</p>}
          {error && <p className="alert alert-danger text-center">{error}</p>}
      
          <div className="row">
            {products.map((p) => (
              <div key={p.ProductID} className="col-lg-4 col-md-6 mb-4">
                <motion.div 
                  className="card border-0 p-3"
                  style={{
                    background: "#1E1E2F",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-body text-center">
                    <h5 className="fw-bold text-warning">{p.ProductName}</h5>
                    <p className="text-light">{p.Description}</p>
                    <p className="fw-bold text-info fs-5">{parseFloat(p.Price).toLocaleString()} บาท</p>
      
                    <div className="mb-3">
                      <label className="form-label text-white">Quantity:</label>
                      <input 
                        type="number" 
                        className="form-control text-center"
                        style={{
                          background: "#25293C",
                          border: "1px solid #FFD700",
                          color: "white"
                        }} 
                        value={quantity[p.ProductID] || 1} 
                        min="1"
                        onChange={(e) => handleQuantityChange(p.ProductID, parseInt(e.target.value))}
                      />
                    </div>
      
                    <motion.button 
                      className="btn w-100"
                      style={{
                        background: "#008CBA",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        padding: "10px"
                      }}
                      whileHover={{ scale: 1.1, background: "#FFD700", color: "#25293C" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(p)}
                    >
                      🛒 Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      );
      
           
};

export default Products;
