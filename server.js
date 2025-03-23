const express = require('express');
const app = express();
const routes = require('./routes');
const mongodb = require('./db/database');
const bodyParser = require('body-parser');
const { logError, isOperationalError, errorHandler } = require('./errors/errorHandler');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origen, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next()
    })


app.use('/', routes);

app.use(errorHandler);


process.on('uncaughtException', (error, origin) => {
    console.log(process.stderr.fd, `Caught exeption: ${error}\n` + ` Exeption origin: ${origin}`);
})


mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node is runnining on port ${port}`);
        })
    }
})