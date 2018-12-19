// 引入数据库连接
const m_article = require('../moudel/m_artilce');
// 引入时间格式包
const moment = require('moment');
// 渲染文章列表
exports.showArticle = (req,res) => {
    m_article.findArticle((err,data)=>{
        
        // console.log(data);
        res.render('index.html',{list:data,user:req.session.user});
    })
};
// 接收 发起文章请求处理
exports.createArticle =  (req,res) => {
    res.render('topic/create.html');
}
// 处理创建文章到数据库
exports.handlerArticle =  (req,res) => {
    const body = req.body;
    // 给body添加成员创建时间
    body.createdAt = moment().format();
    // 给body添加id成员
    body.userId = req.session.user.id;
    // console.log(body); 
    m_article.addArticle(body,(err,data) => {
        if (err) {
            return res.send({
                code:500,
                msg:'服务器请求错误'
            });    
        }
        res.send({
            code:200,
            msg: '添加成功'
        });
    })
    // res.render('topic/create.html');
};

