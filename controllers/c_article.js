// 引入数据库连接
const m_article = require('../moudel/m_artilce');
// 引入时间格式包
const moment = require('moment');
// 渲染文章列表
exports.showArticle = (req, res) => {
    m_article.findArticle((err, data) => {

        // console.log(data);
        res.render('index.html', {
            topics: data,
            user: req.session.user
        });
    })
};
// 接收 发起文章请求处理
exports.createArticle = (req, res) => {
    res.render('topic/create.html');
}
// 处理创建文章到数据库
exports.handlerArticle = (req, res) => {
    const body = req.body;
    // 给body添加成员创建时间
    body.createdAt = moment().format();
    // 给body添加id成员
    body.userId = req.session.user.id;
    // console.log(body); 
    m_article.addArticle(body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器请求错误'
            });
        }
        res.send({
            code: 200,
            msg: '添加成功'
        });
    })
    // res.render('topic/create.html');
};

// 渲染 详情页面
exports.showDetailarticle = (req, res) => {
    // 查找对应id显示的文章动态路由
    const articleID = req.params.articleID;
    // console.log(articleID);
    m_article.handlerDetailarticle(articleID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: err.message
            })
        }
        // console.log(data);
        // 查询完毕返回的数据
        res.render('topic/show.html', {
            article: data[0]
        });
    })
};
// 删除文章
exports.deleteArticle = (req, res) => {
    const articleID = req.params.articleID;
    m_article.handlerDeletearticle(articleID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: err.message
            })
        }
        // 如果删除成功 返回详情页
        res.redirect('/');
    });
};

// 点击按钮跳转到相应的编辑页面
exports.editArticle = (req, res) => {
    const articleID = req.params.articleID;
    // console.log(articleID,body);
    // 根据id查询文章   
    m_article.handlerDetailarticle(articleID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: err.message
            })
        }
        res.render('topic/edit.html', {
            article: data[0]
        });
    });
};

// 处理编辑文章
exports.handleEditarticle = (req, res) => {
    const articleID = req.params.articleID;
    const body = req.body;
    // console.log(body);
    // 查询文章进行修改
    m_article.handleEditarticle(articleID, body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: err.message
            })
        }
        // 修改好了 返回页面
        // console.log(data);
        res.send({
            code:200,
            msg:'修改成功'
        })
    })
}