const express = require('express');
const route = express.Router()

const controller = require('../controller/controller');

route.post('/api/students', controller.create);
route.get('/api/students', controller.find);
route.get('/api/students/:id', controller.find);
route.put('/api/students/:id', controller.update);
route.delete('/api/students/:id', controller.delete);

module.exports = route