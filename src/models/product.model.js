const db = require('../database')

const Product = function (productData) {
    this.product_id = productData.product_id;
    this.product_name = productData.product_name;
    this.discription = productData.discription;
    this.price = productData.price;
};

Product.select = async (data, result) => {
    let sql = 'select * from product';

    const res = await db.query(sql);
    if (res.length == 0) {
        result({ status: false, dataLists: res }, null);
        return;
    }
    result(null, { dataLists: res });
};

Product.add = async (data, result) => {
    console.log(data);
    await db.query('insert into product set ?', data)
        .then((row) => {
            result(null, { status: true, message: 'add success' });
            return;
        }).catch(error => {
            result({ status: false, message: "can't add success" }, null);
        })
};


Product.update = async (data, result) => {
    await db.query('update product set product_name=? ,price=? ,discription=? where product_id=?', [data.product_name, data.price, data.discription, data.product_id])
        .then(() => {
            result(null, { status: true, message: 'update success' });
        }).catch(error => {
            result({ status: false, message: 'update fail' }, null);
        });
};

Product.delete = async (id, result) => {
    await db.query('delete FROM product where product_id=?', [id])
        .then(() => {
            result(null, { status: true, message: 'delete success' });
        }).catch(error => {
            result({ status: false, message: 'delete fail' }, null);
        });
};




module.exports = Product;
