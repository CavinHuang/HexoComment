'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter')

const ArticleLikeSchema= new Schema({
  id: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    unique: true,
    require: true
  },
  title: {
    type: String,
    default: ''
  },
  like: {
    default: 0,
    type: Number
  },
  views_count: {
    default: 0,
    type: Number
  },
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
ArticleLikeSchema.pre('save', function (next) {
  if (this.isNew) {
    let articleLike = this
    // 自增
    return Counter.incrementCounter('articleLike', function (err, res) {
      if (err) {
        return next(err)
      }
      articleLike.id = res
      articleLike.meta.createAt = articleLike.meta.updateAt = Date.now()
      next()
    })
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
console.log('ArticleLikeSchema', ArticleLikeSchema);
var ArticleLike = mongoose.model('ArticleLike', ArticleLikeSchema)

module.exports = ArticleLike
