const express = require('express')
const path = require('path')
const fs = require('fs')
// 引入body-parser
const bodyParser = require('body-parser')

// 创建express实例对象
const app = express()

// 第三方日志中间件
const morgan = require('morgan')

// 第三方跨域中间件
const cors = require('cors')

// 端口号
const PORT = process.env.PORT || 3000

const logger = require('morgan')

// 引入路由
const router = require('./router')

// 解析application/x-www-form-urlencoded数据格式
app.use(bodyParser.urlencoded({ extended: true }))

// 解析json数据格式
app.use(bodyParser.json())

// 解析text/plain 数据格式
app.use(bodyParser.text())

// 引入错误处理中间件
const errorHandle = require('./middleware/error-handler')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

// 挂载路由 http://localhost:4000/api/user/login 可以访问到
app.use('/api', router)

// 访问 http://localhost:4000/images/logo.png 可以看到图片显示成功
app.use('/', express.static(path.join(__dirname, 'public')))

// 使用错误处理中间件
app.use(errorHandle())

const accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/request.log'), { flags: 'a', encoding: 'utf8' }) // 记得要先把目录建好，不然会报错
app.use(logger('combined', { stream: accessLogStream }))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
