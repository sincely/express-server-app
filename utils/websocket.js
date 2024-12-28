class ReSocket {
  constructor(url, options = {}) {
    this.url = url // WebSocket 服务器地址
    this.options = options // 可选参数
    this.socket = null // WebSocket 实例
    this.maxReconnectTimes = options.maxReconnectTimes || 5 // 最大重连次数
    this.reconnectTimes = 0 // 当前重连次数
    this.reconnectInterval = options.reconnectInterval || 3000 // 重连间隔时间（毫秒）
    this.isClosed = false // 是否已关闭
    this.isOpen = false // 是否已打开
    this.isConnect = false // 是否已连接
    this.isReconnecting = false // 是否正在重连
    this.isDestroyed = false // 是否已销毁
    this.reconnectTimer = null // 重连定时器
    this.heartbeatTimer = null // 心跳定时器
    this.heartbeatInterval = options.heartbeatInterval || 30000 // 心跳间隔时间（默认30秒）
    this.heartbeatData = options.heartbeatData || 'ping' // 心跳数据
    this.onMessageCallback = null // 消息接收回调
    this.onOpenCallback = null // 连接成功回调
    this.onCloseCallback = null // 连接关闭回调
  }

  // 创建WebSocket实例
  createSocket() {
    this.socket = new WebSocket(this.url)

    this.socket.onopen = () => {
      this.isOpen = true
      this.isConnect = true
      this.reconnectTimes = 0 // 重连次数归零
      this.startHeartbeat() // 启动心跳机制
      if (this.onOpenCallback) {
        this.onOpenCallback()
      } // 调用连接成功回调
    }

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data)
      } // 调用消息接收回调
    }

    this.socket.onclose = () => {
      this.isOpen = false
      this.isConnect = false
      this.stopHeartbeat() // 停止心跳机制
      if (this.onCloseCallback) {
        this.onCloseCallback()
      } // 调用连接关闭回调
      if (!this.isClosed && this.reconnectTimes < this.maxReconnectTimes) {
        this.reconnect() // 尝试重连
      }
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket 错误: ', error) // 错误处理
    }
  }

  // 开始连接
  connect() {
    if (this.isDestroyed) {
      return
    } // 如果已销毁，则不再连接
    this.createSocket() // 创建WebSocket实例
  }

  // 重连
  reconnect() {
    if (this.isReconnecting || this.reconnectTimes >= this.maxReconnectTimes) {
      return
    } // 防止重复重连

    this.isReconnecting = true
    this.reconnectTimes++ // 增加重连次数

    this.reconnectTimer = setTimeout(() => {
      console.log(`正在重连... (${this.reconnectTimes})`) // 打印重连次数
      this.createSocket() // 再次创建WebSocket实例
      this.isReconnecting = false // 重连状态设置为false
    }, this.reconnectInterval) // 按设定时间重连
  }

  // 发送消息
  send(data) {
    if (this.isOpen) {
      this.socket.send(data) // 发送数据
    } else {
      console.error('WebSocket 未打开，无法发送消息。') // 提示错误
    }
  }

  // 设置消息接收回调
  onMessage(callback) {
    this.onMessageCallback = callback // 绑定接收消息的回调
  }

  // 设置连接成功回调
  onOpen(callback) {
    this.onOpenCallback = callback // 绑定连接成功的回调
  }

  // 设置连接关闭回调
  onClose(callback) {
    this.onCloseCallback = callback // 绑定连接关闭的回调
  }

  // 启动心跳机制
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.isOpen) {
        this.send(this.heartbeatData) // 发送心跳数据
      }
    }, this.heartbeatInterval) // 按设定的时间间隔发送
  }

  // 停止心跳机制
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer) // 清除心跳定时器
      this.heartbeatTimer = null
    }
  }

  // 关闭连接
  close() {
    this.isClosed = true // 设置为已关闭
    this.isOpen = false
    this.socket.close() // 关闭WebSocket连接
    this.stopHeartbeat() // 停止心跳机制
    clearTimeout(this.reconnectTimer) // 清除重连定时器
  }

  // 销毁实例
  destroy() {
    this.isDestroyed = true // 设置为已销毁
    this.close() // 关闭连接
  }
}
