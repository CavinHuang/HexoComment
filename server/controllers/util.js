import path from 'path'
import crypto from 'crypto'
import mkdirp from 'mkdirp'
import moment from 'moment'
import { URL } from 'url'
import {ajax} from '../utils'
import fs from 'fs'
const config = require('../config')
const uploadConf = config.upload

class Util {
  constructor () {

  }
  /**
   * 文件上传
   * @param Object ctx
   */

  async upload (ctx) {
    const origin = ctx.request.origin
    const expireDay = uploadConf.expire.day
    const hash = crypto.createHash('md5')
    const date = moment().format('YYYY/MM/DD')
    const uploadDir = path.resolve(__dirname, uploadConf.dir, date)
    console.log(ctx.request.body.files)
    const file = ctx.request.body.files.file
    const suffix = path.extname(file.name).toLowerCase()
    const now = (new Date()).getTime()
    const fileName = hash.update(now + Math.random().toString()).digest('hex') + suffix

    let reader, stream

    /* istanbul ignore if */
    if (!fs.existsSync(uploadDir)) mkdirp.sync(uploadDir)

    if (uploadConf.types.indexOf(suffix) === -1) {
      ctx.body = ctx.util.refail(`上传失败，仅支持 ${uploadConf.types.join('/').replace(/\./g, '')} 文件类型`)
      return
    }

    if (file.size > uploadConf.size) {
      ctx.body = ctx.util.refail('上传失败，超过限定大小')
      return
    }

    reader = fs.createReadStream(file.path)
    stream = fs.createWriteStream(path.join(uploadDir, fileName))
    reader.pipe(stream)

    ctx.body = ajax(2000, '上传成功', {
      path: new URL(path.join('upload', date, fileName), origin).href,
      expire: expireDay > 0
        ? moment().add(expireDay, 'days').format('YYYY-MM-DD 00:00:00')
        : /* istanbul ignore next */ -1
    })
  }
}
module.exports = () => {
  return new Util()
}
