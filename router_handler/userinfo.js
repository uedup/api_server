//导入数据库操作模块
const db = require('../db/index')

//使用 bcryptjs 对用户密码进行解密
const bcrypt = require('bcryptjs')

//获取用户信息
exports.getUserInfo = (req,res) => {
    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
    console.log(req.user.id);
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
    
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败！')
    
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
};

// 更新用户信息
exports.updateUserInfo = (req,res) => {
    const sql = `update ev_users set ? where id=?`
    // console.log(req.body)
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
      
        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0)
    })
};

//更新用户密码
exports.updatepwd = (req,res) => {
    // 接收表单数据
    const userinfo = req.body

    const sql = `select password from ev_users where id=?`
    // console.log(req.user);
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
    
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.oldPwd, results[0].password)
        if(!compareResult){
            res.cc('密码验证错误，请重新输入')
        }else{
            // 3. 将用户信息响应给客户端
            const sql = `update ev_users set password=? where id=?`

            // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
            userinfo.newPwd = bcrypt.hashSync(userinfo.newPwd, 10)
            db.query(sql, [userinfo.newPwd, req.user.id], (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.cc(err)
              
                // 执行 SQL 语句成功，但影响行数不为 1
                if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
              
                // 修改用户信息成功
                return res.cc('修改用户基本信息成功！', 0)
            })
        }
        
    })

};


// 更新用户头像
exports.updateavatar = (req,res) => {
    const sql = `update ev_users set user_pic=? where id=?`
    // console.log(req.body)
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户头像失败！')
      
        // 修改用户信息成功
        return res.cc('修改用户头像成功！', 0)
    })
};