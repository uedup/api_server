// 导入 express 模块
const express = require('express')
const userRouter = require('./router/user')

// 创建 express 的服务器实例
const app = express()

// write your code here...
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

app.use('/api', userRouter)

app.get('/hello',(req,res) => {
    console.log(req);
    res.send('app_server is OK！')
    }
)

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
