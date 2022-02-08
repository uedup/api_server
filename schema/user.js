//为表单中携带的每个数据项，定义验证规则
const joi = require('joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 用户id的验证规则
const id = joi.number().integer().min(1).required()

// 用户昵称的验证规则
const nickname =  joi.string().required()

// 用户邮箱的验证规则
const email =  joi.string().email().required()

// 图片验证规则
const img = joi.string().dataUri().required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}

// 
exports.update_userinfo_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    id,
    nickname,
    email,
    // username
  },
}

exports.update_updatepwd_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}

// 
exports.update_updateavatar_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    avatar:img,
  },
}