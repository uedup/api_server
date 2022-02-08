// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

const joi = require('joi');

// 导入配置文件
const config = require('./jwt/config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

const userRouter = require('./router/user')
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')

// 响应数据的中间件,优化res.send
app.use((req,res,next) => {
  res.cc =(error,status=1) => {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    const msg = status? 'error':'message'
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message:error instanceof Error?error.message:error
    })
  };
  
  next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

app.use('/api', userRouter)
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)

// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)


// 全局错误级别中间件中，捕获验证失败的错误，并把验证失败的结果响应给客户端
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
