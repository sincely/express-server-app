// 新增
// exports.userAll = `SELECT * FROM user;`
module.exports = {
  // 查询用户
  userAll: `SELECT * FROM user WHERE name  LIKE 'T%'`,
  // 新增用户
  insertUser: `INSERT INTO user(wx_user_id,username,user_id) VALUES(?,?,?)`,
  // 获取指定用户
  getUserById: 'SELECT * FROM user WHERE wx_user_id = ?',
  // 更新
  updateUser: `UPDATE user set username='haha' WHERE wx_user_id = 'testhaha'`,
  // 删除
  deleteUser: `DELETE FROM user WHERE wx_user_id = ?`
}
