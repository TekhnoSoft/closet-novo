const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const fs = require('fs');
const http = require('http');
const https = require('https');

const database = require("./database");

app.use(cors({
    origin: '*'
}));
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

(async () => {
    database.sync();
})();


const usersRoute = require('./routes/users');

app.use('/users', usersRoute);


if(process.env.DEVELOPMENT_MODE == "true"){
    var httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT);
}else{
    var httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT);
}
