const { expressjwt: jwt } = require('express-jwt')

// 验证token过期
const jwtAuth = jwt({
  secret: 'april', // 密钥
  algorithms: ['HS256'] // 签名算法
}).unless({
  // 除了以下这些 URL，其他的URL都需要验证
  path: ['/api/login', '/api/register', /^\/public\/.*/, /^\/static\/.*/] // unless 设置jwt认证白名单
})

module.exports = jwtAuth
