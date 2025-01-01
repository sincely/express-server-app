const express = require('express')
const path = require('path')
const fs = require('fs')
// 引入body-parser
const bodyParser = require('body-parser')
// 创建express实例对象
const app = express()
// 第三方日志中间件记录详细请求信息
const morgan = require('morgan')
// 增强Express应用程序安全性的中间件
const helmet = require('helmet')
// 第三方跨域中间件
const cors = require('cors')
// 端口号
const port = 3000
const multipart = require('connect-multiparty')
// 引入路由
const router = require('./router')
// 解析application/x-www-form-urlencoded数据格式
app.use(bodyParser.urlencoded({ extended: true }))
// 解析json数据格式
app.use(bodyParser.json())
// 解析text/plain 数据格式
app.use(bodyParser.text())
// 解析form-data提交数据
app.use(multipart())
// 引入错误处理中间件
const errorHandle = require('./middleware/error-handler')
app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
app.use(helmet())

// 挂载路由http://localhost:4000/api/user/login 可以访问到接口数据
app.use('/api', router)

// 访问http://localhost:4000/images/logo.png 可以看到图片显示成功
app.use('/', express.static(path.join(__dirname, 'public')))

// 使用错误处理中间件
app.use(errorHandle())

const accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/request.log'), { flags: 'a', encoding: 'utf8' }) // 记得要先把目录建好，不然会报错
app.use(morgan('combined', { stream: accessLogStream }))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'x-www-form-urlencoded', 'X-Requested-With,content-type, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  next()
})

/**
 * 处理服务器启动过程中的错误
 * @param {Error} error - 错误对象
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // 用友好信息处理特定的监听错误
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

async function startServer() {
  try {
    const server = app.listen(port, () => {
      console.log(`App is running at http://localhost:${port}`)
      console.log('Press CTRL-C to stop\n')
    })

    server.on('error', onError)
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

startServer()
