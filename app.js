// app.js

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

app.get('/', (req, res) => res.send('testing.. testing.. 1 2 '));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));