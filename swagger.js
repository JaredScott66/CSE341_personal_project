const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Cargo registry API',
        description: 'A cargoship registering API for use on starbases'
    },
    host: 'cse341-personal-project-zpvh.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);