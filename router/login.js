const express = require('express')
const router = express.Router() //模块化路由
// 引入用户处理函数
const loginController = require('../controller/loginController')

// 路由中间件
function login_middleware(req, res, next) {
  console.log('中间件1')
  next() //传递给下一步
}

function login_params(req, res, next) {
  let { name, password } = req.query
  if (!name || !password) {
    //发送消息，结束响应，不需要再调用next
    res.json({
      message: '参数校验失败'
    })
  } else {
    next()
  }
}

// 登录
router.post('/login', [login_middleware, login_params], loginController.login)

module.exports = router
