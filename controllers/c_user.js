// 函数处理模块,找到对应的处理函数 处理功能
// const conn = require('../mysql');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'news58'
});

connection.connect();



//  渲染登录页面
module.exports.showSignin = (req, res) => {
    // res.write('run it----');
    // res.end();
    res.render('signin.html');
};

// 处理登录请求
module.exports.handlerSignin = (req, res) => {
    //  1 获取表单数据
    let body = req.body;
    // console.log(body);
    // 先验证邮箱是否存在
    const sql = 'SELECT * FROM `users` WHERE email = ?';
    connection.query(sql, body.email, (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            res.send({
                code: 0,
                msg: '用户名不存在'
            });
        }
        // console.log(results);
        // 验证该邮箱的密码是否正确 
        if (results[0].password !== body.password) {
            return res.send({
                code: -1,
                msg: '密码错误'
            })
        }
        res.send({
            code: 200,
            msg: '登录成功'
        })
    
        // 返回相应
    })


};


// connection.end();