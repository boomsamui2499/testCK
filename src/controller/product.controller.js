const moment = require('moment-timezone');
const Product = require('../models/product.model');
const verify = require('../authorization/verifyToken');
const { addValidation, updateValidation } = require('../validate/validate');
const jwt = require('jsonwebtoken');



exports.select = async (req, res) => {
    Product.select(req.query, (err, data) => {
        if (err) res.status(500).send({ message: err.message || 'can\'t get  selectall' }); else res.send(data);
    });

};


exports.add = async (req, res) => {

    if (!req.body) return res.status(400).send({ message: 'content can not be empty!' });

    const { error } = addValidation(req.body);
    console.log(error);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const Productadd = new Product({
        product_name: req.body.product_name,
        price: req.body.price,
        discription: req.body.discription
    });

    Product.add(Productadd, (err, data) => {
        if (err) res.status(500).send({ message: err.message || 'can\'t add Product' }); else res.send(data);
    });


};

exports.update = async (req, res) => {

    if (!req.body) return res.status(400).send({ message: 'content can not be empty!' });
    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const Productdataupdate = new Product({
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        price: req.body.price,
        discription: req.body.discription
    });

    Product.update(Productdataupdate, (err, data) => {
        if (err) res.status(500).send({ message: err.message || 'can\'t update Product' }); else res.send(data);
    });
};



exports.delete = async (req, res) => {

    if (!req.body) return res.status(400).send({ message: 'content can not be empty!' });
    const id = req.body.product_id;
    Product.delete(id, (err, data) => {
        if (err) res.status(500).send({ message: err.message || 'can\'t delete Product' }); else res.send(data);
    });
};




