const express = require('express');
const routes = require('./routes');
const mongo = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(routes);

mongo.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}.`);
    });
});