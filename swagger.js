const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Cargo registry API',
        description: 'A cargoship registering API for use on starbases'
    },
    host: 'localhost:3000',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);