// 引入express包 搭建服务器
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var morgan = require('morgan');
// 创建app实例对象
const app = express();
// 配置浏览日志
// app.use(morgan('tiny'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news58'
};
const sessionStore = new MySQLStore(options);
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// 配置公共属性 user存档
app.use((req,res,next)=>{
    // console.log(app.locals);
    app.locals.user = req.session.user;
    console.log(app.locals.user);
    next();

});

// 配置静态资源  自己的 和 第三方的
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
// 配置body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.engine('html', require('express-art-template'));

// 挂在路由

app.use(router);

app.use((req,res,next)=>{
    res.render('404.html');
    next();
})

// 增加错误处理
app.use((err,req,res,next)=>{
    res.send({
        code:500,
        msg:err.message
    })
})

// 监听端口号
app.listen('8000', () => {
    console.log('---success---');
})