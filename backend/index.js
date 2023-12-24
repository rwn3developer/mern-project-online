const express = require('express');

const dotenv = require('dotenv');

const path = require('path');

const morgan = require('morgan'); //server mathi kai request aave chhe ae batavshe like get or post

const {connectDb} = require('./config/db');  

const cors = require('cors');

dotenv.config();

connectDb()

const app = express();

app.use(express.json());

app.use(morgan('dev'));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.urlencoded());

app.use('/',require('./routes/authRoute'));
app.use('/category',require('./routes/categoryRoutes'));
app.use('/product',require('./routes/productRoute'));


app.listen(PORT,(err)=>{
    if(err){
        console.log("server is not start");
        return false;
    }
    console.log(`server is start on port :- ${PORT}`); 
})
