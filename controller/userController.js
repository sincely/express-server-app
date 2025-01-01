const mysql = require('../db/mysql')
const userService = require('../service/userService') // 数据交互层操作

const getJson = (req, res) => {
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
const getAll = async (req, res) => {
  const data = await mysql.query(userService.getUserAll)
  res.json({
    data: data,
    code: 200
  })
}

// 分页查询用户
const getAllUser = async (req, res) => {
  // 从请求中获取分页参数和查询条件
  const { page = 1, pageSize = 10, username } = req.query
  // 计算分页偏移量
  const offset = (page - 1) * pageSize
  // 构建基础 SQL 查询
  let sql = 'SELECT * FROM tb_user WHERE 1=1'
  const params = []
  // 添加查询条件
  if (username) {
    sql += ' AND username LIKE ?'
    params.push(`%${username}%`)
  }

  // 添加分页条件
  sql += ' LIMIT ? OFFSET ?'
  params.push(Number(pageSize), Number(offset))

  // 执行查询
  const data = await mysql.query(sql, params)

  // 查询总数（用于返回总条数）
  let countSql = 'SELECT COUNT(*) AS total FROM tb_user WHERE 1=1'
  const countParams = []
  if (username) {
    countSql += ' AND username LIKE ?'
    countParams.push(`%${username}%`)
  }
  const countResult = await mysql.query(countSql, countParams)
  console.log(countResult)
  const total = countResult[0].total

  // 返回结果
  res.json({
    data: data,
    total: total,
    page: Number(page),
    pageSize: Number(pageSize),
    code: 200
  })
}

// 查询指定用户
const getuserById = async (req, res) => {
  const sql = 'SELECT * FROM tb_user WHERE id = ?'
  const params = [req.query.id]
  const user = await mysql.query(sql, params)
  res.json({
    data: user,
    code: 200
  })
}

// 新增用户
const addUser = function (req, res) {}

// 更新
const updateUser = (req, res) => {}
// 删除
const deleteUser = (req, res) => {}

const getLogin = (req, res) => {}
module.exports = {
  getAllUser,
  getJson,
  getLogin,
  getuserById,
  addUser,
  updateUser,
  deleteUser
}
