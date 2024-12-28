const express = require('express')
const router = express.Router() //模块化路由
//注入验证模块
const jwtAuth = require('../utils/auth')

router.use(jwtAuth)
// 全局路由中间件
module.exports = () => {
  return (err, req, res, next) => {
    // 自定义用户认证失败的错误返回
    console.log('err===', err)
    if (err && err.name === 'UnauthorizedError') {
      const { status = 401, message } = err
      // 抛出401异常
      res.status(status).json({
        code: status,
        msg: 'token失效，请重新登录',
        data: null
      })
    } else {
      const { output } = err || {}
      // 错误码和错误信息
      const errCode = (output && output.statusCode) || 500
      const errMsg = (output && output.payload && output.payload.error) || err.message
      res.status(errCode).json({
        code: errCode,
        msg: errMsg
      })
    }
  }
}
