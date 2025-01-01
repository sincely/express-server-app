// 格式化时间
const formatTime = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format)
}
