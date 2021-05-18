// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const gameRoutes = require('./routes/api/gameRoutes');
const userRoutes = require('./routes/api/userRoutes');
const reviewRoutes = require('./routes/api/reviewRoutes');
const app = express();

// Connect to Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true}));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing
app.get('/', (req, res) => res.send('GET request'));
app.post('/', (req, res) => res.send('POST request'));

// use routes
app.use('/game/', gameRoutes);
app.use('/users/', userRoutes);
app.use('/reviews/', reviewRoutes);

const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});