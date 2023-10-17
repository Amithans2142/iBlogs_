const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 4000;
const cors = require('cors');
const corsOptions = require('./config/corsOptions')


  
  app.use(cors(corsOptions));
  


  

app.listen(Port, () => {
  console.log("Listening At Port", Port);
});

app.use(express.json());

const route = require('../backend/routes/route');
app.use('/api/v1', route);

app.get("/", (req, res) => {
  res.json("hello");
});

const connectToDb = require('../backend/config/database');
connectToDb();
