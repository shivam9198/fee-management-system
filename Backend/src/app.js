// backend/app.js
              

 require('dotenv').config();
const express = require('express');
const cors = require('cors');


const connectDB = require('./config/dataBase');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');

const app = express();
const PORT = process.env.PORT || 3000 ;


connectDB();


app.use(cors()); 
app.use(express.json());


app.use('/api/auth', authRoutes); 
app.use('/api', studentRoutes);  


app.get('/', (req, res) => {
  res.send('Student Fee Management Backend API is running!');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 