// 导入 mysql 模块
const mysql = require('mysql')

const hosts ={
    work:'192.167.1.2',
    wins:'192.167.1.2',
    local:'127.0.0.1'
}

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'jdw_db',
})

// 向外共享 db 数据库连接对象
module.exports = db