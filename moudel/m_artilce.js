const connection = require('../config/db_config');

// 查询数据库文章列表
exports.findArticle = (callback) => {
    const sql = 'SELECT * FROM `topics` ORDER BY id DESC';
    connection.query(sql,(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
};

// 增加写入文章到数据库
exports.addArticle = (body,callback) => {
    const sql = 'INSERT INTO `topics` SET ?';
    connection.query(sql,body, (err,data) => {
         if (err) {
             return callback(err);
         }
         callback(null, data);
    });
};
