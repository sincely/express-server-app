const db = require('../db/mysql')

// 简化的检查ID是否存在的函数
exports.checkIdExists = (id, table) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      resolve(null)
    } else {
      const sql = `SELECT id FROM ${table} WHERE id = ?`
      db.query(sql, [id], (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.length > 0 ? id : null)
      })
    }
  })
}
