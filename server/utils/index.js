/**
 * 常用工具函数
 */

/**
 * 定义ajax统一返回
 * @param  {Number} [code=2000] [description]
 * @param  {String} [msg='']    [description]
 * @param  {Object} [data={}]   [description]
 * @param  {String} [url='']    [description]
 * @return {[type]}             [description]
 */
exports.ajax = (code = 2000, msg = '', data = {}, url = '') => {
  return {
    code: code,
    msg: msg,
    data: data,
    url: url
  }
}
