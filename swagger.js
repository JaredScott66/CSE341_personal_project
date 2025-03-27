const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Cargo registry API',
        description: 'A cargoship registering API for use on starbases'
    },
    host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000',
    schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);