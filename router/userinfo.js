const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入用户信息路由处理函数模块
const userHandler = require('../router_handler/userinfo')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_userinfo_schema ,update_updatepwd_schema,update_updateavatar_schema} = require('../schema/user')

//获取用户信息
router.get('/userinfo',userHandler.getUserInfo)
// 更新用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema), userHandler.updateUserInfo)
//更新用户密码
router.post('/update/pwd',expressJoi(update_updatepwd_schema), userHandler.updatepwd)
router.post('/update/avatar',expressJoi(update_updateavatar_schema), userHandler.updateavatar)

// 将路由对象共享出去
module.exports = router