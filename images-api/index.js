const express = require('express');
const app = express();
const db = require('./models');
const fileRoutes = require('./routes/files');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({
    origin: '*'
}));
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

db.sequelize.sync().then(() => console.log("Database synced"));

app.use('/files', fileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));