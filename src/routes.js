const { Router, request, response } = require('express');
const routes = Router();

const maratonerStore = require('./store/maratoner-store');

routes.post('/maratoners', maratonerStore.addMaratoner);

routes.get('/maratoners', maratonerStore.getMaratoners);

routes.get('/', (request, response) => {
    return response.send('Hello doidos');
});

module.exports = routes;