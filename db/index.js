// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '192.167.1.3',
  user: 'root',
  password: 'admin123',
  database: 'jdw_db',
})

// 向外共享 db 数据库连接对象
module.exports = db