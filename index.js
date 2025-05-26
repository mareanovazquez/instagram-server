const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

// Aquí irá nuestra ruta para Instagram
app.get('/api/instagram', async (req, res) => {
    // Por ahora solo una respuesta de prueba
    res.json({ mensaje: 'Ruta de Instagram lista' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});