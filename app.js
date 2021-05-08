// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const games = require('./routes/api/games');
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const app = express();

// Connect to Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true}));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('testing.. testing.. 1 2 '));

// use routes
app.use('/api/games', games);
app.use('/', userRoutes);
app.use('/', authRoutes);


const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});