

require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // to let the server accept json in get/post/etc... requests 


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => {console.error(error)})
db.once('open', () => {console.log('opened connection Mo')});



const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(3000, () => {console.log('running again')})