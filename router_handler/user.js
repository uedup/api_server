/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

//导入数据库操作模块
const db = require('../db/index')

//使用 bcryptjs 对用户密码进行加密
const bcrypt = require('bcryptjs')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 接收表单数据
    const userinfo = req.body

    // 判断数据是否合法
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或密码不能为空!!!');
    // }

    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //INSERT INTO `jdw_db`.`ev_users` (`username`, `password`) VALUES ('lilong', '1234');
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) {
        return res.cc('注册用户失败，请稍后再试！')
      }
      // 注册成功
      res.cc('注册成功！',0)
    })
  }
  
  // 登录的处理函数
  exports.login = (req, res) => {
    res.send('login OK')
  }