const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const http = require('http');

const database = require("./database");

app.use(cors({
    origin: '*'
}));
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

(async () => {
    database.sync().then(() => {
        console.log("Banco de dados sincronizado com o novo campo!");
    })
    .catch(error => {
        console.error("Erro ao sincronizar o banco de dados:", error);
    });
})();

const usersRoute = require('./routes/users');
const categoriesRoute = require('./routes/categories');
const brandsRoute = require('./routes/brands');
const freteRoute = require('./routes/frete');
const carouselRoute = require('./routes/carousel');
const homeViewsRoute = require('./routes/home_views');
const productRoute = require('./routes/product');
const favoriteRoute = require('./routes/favorite');

app.use('/users', usersRoute);
app.use('/categories', categoriesRoute);
app.use('/brands', brandsRoute);
app.use('/frete', freteRoute);
app.use('/carousel', carouselRoute);
app.use('/homeviews', homeViewsRoute);
app.use('/product', productRoute);
app.use('/favorite', favoriteRoute);

if(process.env.DEVELOPMENT_MODE == "true"){
    var httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT);
}else{
    var httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT);
}
