/**
 * 文章评论
 * @type {[type]}
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Counter = mongoose.model('Counter')
const webCommentSchema = new Schema({
  id: { type: Number, default: false, unique: true },
  nickname: {type: String, default: ''},
  avatar: {type: String, default: ''},
  content: {type: String, default: ''},
  like: {type: Number, default: 0},
  replyCount: {type: Number, default: 0},
  isRecommend: {type: Boolean, default: false},
  pid: {type: Number, default: 0},
  url: {type: String, require: true},
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// Defines a pre hook for the document.
webCommentSchema.pre('save', function (next) {
  if (this.isNew) {
    let websiteType = this
    // 自增
    return Counter.incrementCounter('webComment', function (err, res) {
      if (err) {
        return next(err)
      }
      websiteType.id = res
      websiteType.meta.createAt = websiteType.meta.updateAt = Date.now()
      next()
    })
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

const webComment = mongoose.model('WebComment', webCommentSchema)

module.exports = webComment
