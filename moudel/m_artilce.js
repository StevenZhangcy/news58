const connection = require('../config/db_config');

// 查询数据库文章列表
exports.findArticle = (callback) => {
    const sql = 'SELECT * FROM `topics` ORDER BY id DESC';
    connection.query(sql, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    })
};

// 增加写入文章到数据库
exports.addArticle = (body, callback) => {
    const sql = 'INSERT INTO `topics` SET ?';
    connection.query(sql, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
};
// 根据id查询文章详情页
exports.handlerDetailarticle = (articleID, callback) => {
    const sql = 'SELECT * FROM `topics` WHERE id = ?';
    connection.query(sql, articleID, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    })
};

//删除文章

exports.handlerDeletearticle = (articleID, callback) => {
    const sql = 'DELETE FROM `topics` WHERE id =?';
    connection.query(sql, articleID, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    })
};

// 编辑文章
exports.handleEditarticle = (articleID,body,callback) => {
    const sql = 'UPDATE `topics` SET ? WHERE id = ?';
    connection.query(sql,[body,articleID], (err,data)=> {
        if (err) {
            return callback(err);
        }
        callback(null,data);
    })
};