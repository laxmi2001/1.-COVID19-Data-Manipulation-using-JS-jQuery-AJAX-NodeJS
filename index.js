//commonjs syntax
const express = require('express');
const covid19 = require('./covid19');
const cors = require('cors');

const corsOptions = {
origin:'http://localhost',
optionsSuccessStatus: 200
};

//express application
const app=express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/covid19',covid19);
const port = process.env.PORT || 5500;
//server listening in port 5500
app.listen(port,()=>console.log(`listening on port : ${port}`));
