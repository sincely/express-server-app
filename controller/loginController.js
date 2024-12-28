const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router() //模块化路由
// 查询用户
const login = (req, res) => {
  const { username } = req
  // 登录成功，签发一个token并返回给前端
  const token = jwt.sign(
    // payload：签发的 token 里面要包含的一些数据
    { username },
    // 私钥
    'caowj',
    // 设置过期时间
    { expiresIn: 60 * 60 * 24 } //1 day
  )
  res.json({
    message: '登录成功',
    data: {
      jwtToken: token
    },
    ret: 1
  })
}

module.exports = {
  login
}
