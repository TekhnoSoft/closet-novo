const express = require('express');
const app = express();
const db = require('./models');
const fileRoutes = require('./routes/files');
const path = require('path');

db.sequelize.sync().then(() => console.log("Database synced"));

app.use('/files', fileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));