// 导入 express 模块
const express = require('express')
const userRouter = require('./router/user')

// 创建 express 的服务器实例
const app = express()

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件,优化res.send
app.use((req,res,next) => {
  res.cc =(error,status=1) => {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      error:error instanceof Error?error.message:error
    })
  };
  
  next()
}
)

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
