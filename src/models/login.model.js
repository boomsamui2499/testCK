const db = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const md5 = require('md5');
const Login = function () {
};

Login.checklogin = async (data, result) => {
    const res = await db.query('select no,username,password,token from user where username = ?', [data.username]);
    if (res.length == 0) {
        result(null, { status: false, message: 'login fail' });
        return;
    } else {
        if (res[0].token) {
            result(null, { status: false, message: 'There is a login' });
            return;
        }
        if (bcrypt.compareSync(data.password, res[0].password)) {
            let jwt_token = '';
            let member_token = md5(uniqid()).substr(0, 32);
            jwt_token = jwt.sign({ token: member_token }, 'SuperSecRetKey');
            await db.query('update user set token=? where username=?', [member_token, data.username])
                .then(() => {
                    result(null, { status: true, token: jwt_token, username: res[0].username, message: 'login success' });
                })
        } else {
            result(null, { status: false, message: 'login fail' });
        }
    }
};

Login.checklogout = async (data, result) => {
    await db.query('update user set token="" where token=?', [data])
        .then(() => {
            result(null, { status: true, message: 'Logout success' });
        }).catch(error => {
            result({ status: false, message: 'Logout fail' }, null);
        });
};


module.exports = Login;
