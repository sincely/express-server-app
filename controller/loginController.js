const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('../db/mysql')
const router = express.Router() //模块化路由
const { comparePassword, formatTime, generateToken } = require('../utils/encrypt')
// 查询用户
const login = (req, res) => {
  const { user_name, password } = req.body
  if (!user_name || !password) {
    return res.status(400).json({ status: 400, message: '账号和密码都是必需的' })
  }
  const findUserQuery = 'SELECT * FROM users WHERE user_name = ? AND is_delete = 0'

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
