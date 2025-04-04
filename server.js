require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "https://api.jikan.moe/v4/anime";

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos (index.html)
app.use(express.static("public"));

// Ruta para obtener datos de anime
app.get("/anime", async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    const params = new URLSearchParams({
      limit,
      q: q || ''
    });
    
    const response = await axios.get(`${API_URL}?${params}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: "Error obteniendo datos de anime",
      details: error.message 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
