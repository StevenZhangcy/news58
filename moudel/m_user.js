const connection = require('../config/db_config');
// 根据邮箱查询用户
exports.checkEmail = (email, callback) => {
    const sql = 'SELECT * FROM `users` WHERE email = ?';
    connection.query(sql, email, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
        // 返回相应
    })
};
// 根据昵称查询数据库
exports.checkNickname = (nickname,callback) => {
    const sql = 'SELECT * FROM `users` WHERE nickname = ?';
    connection.query(sql,nickname,(err,data)=> {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    }) 
};

exports.addUser = (body,callback) => {
    const sql = 'INSERT INTO `users` SET ?';
    connection.query(sql,body,(err,data)=>{
        if(err){
            return callback(err);
        }
        callback(null,data);
    })
};