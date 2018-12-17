// 引入express包 搭建服务器
const express = require('express');
// const template = require('art-template');
const bodyParser = require('body-parser');
const router = require('./router');
// 创建app实例对象
const app = express();

// 配置静态资源  自己的 和 第三方的
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
// 配置body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.engine('html', require('express-art-template'));

// 挂在路由

app.use(router);

// 监听端口号
app.listen('8000',() => {
    console.log('---success---');
})