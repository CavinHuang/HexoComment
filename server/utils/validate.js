/**
 * 验证函数
 */

exports.exportError = (error) => {
  let err = error[0]
  let msg = ''
  for (var k in err) {
    msg = err[k]
  }
  return msg
}
