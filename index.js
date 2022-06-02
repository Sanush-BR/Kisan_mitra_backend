// Kisan-Mitra

const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const sectors = require('./routes/sectors');
const loans = require('./routes/loans');
const schemes = require('./routes/schemes');
const farmers = require('./routes/farmers');
const users = require('./routes/users');
const auth = require('./routes/auth');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/schemes',schemes);
app.use('/api/loans',loans);
app.use('/api/types',sectors);
app.use('/api/farmers',farmers);
app.use('/api/users',users);
app.use('/api/auth',auth);



mongoose.connect(process.env.mongo_url)
    .then(() => { console.log('Connected to MongoDB.....')})
    .catch((err) => { console.log('Unable to Connect to MongoDB')})



const port = process.env.PORT || 5500;

app.listen(port,()=>{
    console.log(`listening to the port ${port}.....`);
});


