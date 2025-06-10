const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://epicaserviciosturisticos.com.ar'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

// Aquí irá nuestra ruta para Instagram
// Ruta para obtener posts de Instagram
app.get('/api/instagram', async (req, res) => {
    try {
        const token = process.env.INSTAGRAM_TOKEN;
        const instagramUrl = `https://graph.instagram.com/me/media?fields=thumbnail_url,media_type,media_url,caption,permalink,username,id&limit=6&access_token=${token}`;
        
        const response = await fetch(instagramUrl);
        const data = await response.json();
        
        if (data.error) {
            return res.status(400).json({ error: data.error });
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener datos de Instagram' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});