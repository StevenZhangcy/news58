const express = require('express');
const router = express.Router();
const c_user = require('./controllers/c_user');
const c_article = require('./controllers/c_article');

// 渲染登录页面
router
    .get('/signin',c_user.showSignin)
    .post('/signin', c_user.handlerSignin)
    .get('/',c_article.showArticle)
    .get('/topic/create',c_article.createArticle)
    .post('/topic/create',c_article.handlerArticle)
    .get('/topic/create',c_article.createArticle)
    .get('/signout',c_user.signout)
    .get('/topic/detail/delete/:articleID',c_article.deleteArticle)      // 删除
    .get('/detail/topic/:articleID',c_article.showDetailarticle) // 动态路由设置 显示详情页
    .get('/topic/detail/edit/:articleID',c_article.editArticle) // 修改
    .post('/topic/detail/edit/:articleID',c_article.handleEditarticle)
    .get('/signup',c_user.signup)
    .post('/signup',c_user.handlerSignup);
// 处理登录请求

module.exports = router; 