const { Router } = require('express');
const routes = Router();

const maratonerStore = require('./store/maratoner-store');

routes.get('/maratoners', maratonerStore.getMaratoners);

routes.post('/maratoners', maratonerStore.addMaratoner);

routes.put('/maratoners', maratonerStore.updateMaratoner);

routes.put('/changepass', maratonerStore.changePassword);

routes.put('/forgotpass', maratonerStore.forgotPassword);

routes.delete('/maratoners', maratonerStore.deleteMaratoner);

routes.get('/nearbymaratoners', maratonerStore.getMaratonersByProximityAndSerie);

routes.get('/maratonerbyserie', maratonerStore.getMaratonerBySerie);

routes.get('/login', maratonerStore.login);

routes.get('/', (request, response) => {
	return response.send('Hello Mundo');
});

module.exports = routes;