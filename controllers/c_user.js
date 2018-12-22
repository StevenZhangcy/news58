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
// 退出功能
exports.signout = (req, res) => {
    // 清除session
    delete req.session.user;
    // 页面跳转到登录
    res.redirect('/signin');
};

// 注册功能
exports.signup = (req, res) => {
    res.render('signup.html');
}



// 处理表单提交数据
exports.handlerSignup = (req, res) => {
    const body = req.body;
    // console.log(body);
    // 先查询数据库查询email,如果输入email与数据库有 则用户名存在
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: err.message
            })
        };
        // 如果邮箱存在
        if (data[0]) {
            return res.send({
                code: 1,
                msg: '用户名已存在'
            })
        };
        // ----用户名可以用再次查询用户名 判断昵称能否使用
        m_user.checkNickname(body.nickname, (err, data) => {
            if (err) {
                return res.send({
                    code: 500,
                    msg: err.message
                })
            };
            if (data[0]) {
                return res.send({
                    code: 2,
                    msg: '昵称已存在'
                })
            };
            // ----昵称不存在可以使用 可以添加新用户储存到数据库
            m_user.addUser(body, (err, data) => {
                if (err) {
                    return res.send({
                        code: 500,
                        msg: err.message
                    })
                }
                res.send({
                    code: 200,
                    msg: '注册成功'
                })
            })
        })
    });
};
// connection.end();