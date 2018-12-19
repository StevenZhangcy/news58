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
    .post('/topic/create',c_article.handlerArticle);
// 处理登录请求

module.exports = router;