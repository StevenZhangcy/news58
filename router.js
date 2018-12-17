const express = require('express');
const router = express.Router();
const c_user = require('./controllers/c_user');

// 渲染登录页面
router.get('/signin',c_user.showSignin);

// 处理登录请求
router.post('/signin', c_user.handlerSignin);


module.exports = router;