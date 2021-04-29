const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

// Get Environment Variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Listen to Port
const PORT = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));