
const route = require('express').Router();
const Product = require('../controller/product.controller');


route.get('/select',Product.select);
route.post('/add',Product.add);
route.post('/update',Product.update);
route.post('/delete',Product.delete);

module.exports = route;
