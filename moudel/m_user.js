const connection = require('../config/db_config');

exports.checkEmail = (email, callback) => {
    const sql = 'SELECT * FROM `users` WHERE email = ?';
    connection.query(sql, email, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
        // 返回相应
    })
}