const Joi = require('@hapi/joi');

const addValidation = (req) => {
    const require = Joi.object({
        product_name: Joi.string(),
        discription: Joi.string(),
        price: Joi.number()
    });

    return require.validate(req);
};

const updateValidation = (req) => {
    const require = Joi.object({
        product_id: Joi.number().integer().required(),
        product_name: Joi.string(),
        discription: Joi.string(),
        price: Joi.number()
    });

    return require.validate(req);
};




module.exports.addValidation = addValidation;
module.exports.updateValidation = updateValidation;

