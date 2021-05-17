// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const gameRoutes = require('./routes/api/gameRoutes');
const userRoutes = require('./routes/api/userRoutes');
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
app.use('/', gameRoutes);
app.use('/', userRoutes);


const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});