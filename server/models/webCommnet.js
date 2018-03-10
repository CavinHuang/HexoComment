/**
 * 文章评论
 * @type {[type]}
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const webCommentSchema = new Schema({
  id: { type: Number, default: false, unique: true },
  nickname: {type: String, default: ''}
  avatar: {type: String, default: ''},
  content: {type: String, default: ''},
  like: {type: Number, default: 0},
  replyCount: {type: Number, default: 0},
  isRecommend: {type: Boolean, default: false},
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

const webComment = mongoose.model('WebComment', webCommentSchema)

module.exports = webComment
