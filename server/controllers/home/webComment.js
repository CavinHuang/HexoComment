/**
 * websites controller
 */
import {exportError} from '../../utils/validate'
import {ajax} from '../../utils'
import modelHelper from '../../modelsHelper/modelHelper'
const mongoose = require('mongoose')
const WebComment = mongoose.model('WebComment')
const helper = new modelHelper(WebComment)
class webComment {
  constructor () { }

  create (ctx) {

  }

  fetch (ctx) {}
}

module.exports = () => {
  return new webComment()
}
