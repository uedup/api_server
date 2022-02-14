// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app =  express()

app.use((req,res) => {
  res.send('hello')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
