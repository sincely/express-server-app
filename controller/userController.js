const mysql = require('../db/mysql')
const userService = require('../service/userService')

const getJson = function (req, res) {
  res.json({
    list: [
      {
        name: '12',
        id: 1
      },
      {
        name: 'april',
        id: 2
      }
    ]
  })
}

// 查询用户
const getuser = function (req, res) {
  mysql.query(userService.userAll, res.userId).then((data) => {
    const jsonData = JSON.parse(JSON.stringify(data))
    res.json({
      data: jsonData
    })
  })
}

// 查询指定用户
const getuserById = function (req, res) {
  if (!req.body.wxUserId) {
    res.send({
      ret: 500,
      message: '请传入用户id'
    })
  }
  mysql
    .query({
      sql: userService.getUserById,
      values: [req.body.wxUserId]
    })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data))
      res.json({
        data: jsonData
      })
    })
}

// 新增用户
const addUser = function (req, res) {
  const { wxUserId, userName, userId } = req.body
  const addValue = [wxUserId, userName, userId]

  mysql
    .query({
      sql: userService.insertUser,
      values: addValue
    })
    .then((data) => {
      res.send('增加成功')
    })
}

// 更新
const updateUser = function (req, res) {
  const { userName, wxUserId } = req.body
  mysql
    .query({
      sql: userService.updateUser,
      values: [userName, wxUserId]
    })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data))
      res.json({
        data: jsonData
      })
    })
}
// 删除
const deleteUser = function (req, res) {
  const { wxUserId } = req.body
  mysql
    .query({
      sql: userService.deleteUser,
      values: [wxUserId]
    })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data))
      res.json({
        data: jsonData
      })
    })
}

const getLogin = function (req, res) {
  res.json({
    list: [
      {
        name: '12',
        id: 1
      },
      {
        name: 'april',
        id: 2
      }
    ]
  })
}
module.exports = {
  getJson,
  getLogin,
  getuser,
  getuserById,
  addUser,
  updateUser,
  deleteUser
}
