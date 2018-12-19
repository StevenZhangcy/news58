// 函数处理模块,找到对应的处理函数 处理功能
const m_user = require('../moudel/m_user');

//  渲染登录页面
exports.showSignin = (req, res) => {
    // res.write('run it----');
    // res.end();
    res.render('signin.html');
};
// 处理登录请求
exports.handlerSignin = (req, res) => {
    //  1 获取表单数据
    let body = req.body;
    // console.log(body);
    // 先验证邮箱是否存在
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            throw err;
        }
        if (data.length === 0) {
            return res.send({
                code: 0,
                msg: '用户名不存在'
            });
        }
        // console.log(results);
        // 验证该邮箱的密码是否正确 
        if (data[0].password !== body.password) {
            return res.send({
                code: -1,
                msg: '密码错误'
            })
        }

        // 把用户名用session存起来
        req.session.user = data[0];
        // console.log(req.session);
        res.send({
            code: 200,
            msg: '登录成功'
        })
    })
};

// connection.end();