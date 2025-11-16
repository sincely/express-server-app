// 统一进行路由相关处理
const express = require('express')

// 创建路由实例
const router = express.Router()

// 用户相关路由模块
router.use(require('./user'))

// 登录相关路由模块
// router.use(require('./login'))

// 导出路由实例
module.exports = router
