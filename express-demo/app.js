const express = require('express');
const path = require('path');
const app = express();

const logger = require('./middleware/logger');

const routes = require('./routes/user');

const PORT = 3000;

app.use(logger);

app.use(express.json({inflate: false}));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, () => {
    console.log("Server started on port ",PORT);
});