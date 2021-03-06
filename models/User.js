const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     username: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     role: {
          type: String,
          required: true
     },
     notices: {
          type: [Schema.Types.ObjectId],
          ref: 'Notice'
     }
}, {
     timestamps: true
});

UserSchema.pre('save', function(next) {

     if (!this.isModified('password')) {
          return next();
     }

     bcrypt.genSalt(10, (err, salt) => {
          if (err) return next(err);
          bcrypt.hash(this.password, salt, (err, hash) => {
               if (err) return next(err);
               this.password = hash;
               next();
          })
     })

});


module.exports = mongoose.model('User', UserSchema);