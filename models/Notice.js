const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     body: {
          type: String,
          required: true
     },
     userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
     },
     categoryId: {
          type: Schema.Types.ObjectId,
          ref: 'Category'
     }
}, {
     timestamps: true
});

module.exports = mongoose.model('Notice', NoticeSchema);