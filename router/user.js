const express = require('express')
const router = express.Router()
const upload = require('../utils/upload')
// 引入用户处理函数
const userController = require('../controller/userController')

// 用户
router.get('/user/login', userController.getLogin)
router.delete('/user', userController.deleteUser)
router.post('/upload', upload, (req, res) => {
  console.log('req', req.file)
  res.send('上传成功')
})

router.get('/user/json', userController.getJson)
router.post('/user/getUserId', userController.getuserById)
router.post('/user/addUser', userController.addUser)
router.post('/user/updateUser', userController.updateUser)
router.post('/user/deleteUser', userController.deleteUser)

module.exports = router
