const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      min: 3,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate(value) {
        const regexp = /\S+@\S+\.\S+/;
        return regexp.test(String(value).toLowerCase());
      },
    },
    hash: {
      type: String,
      required: [true, 'Please enter your password'],
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

UserSchema.pre('save', function () {
  this.hash = bcrypt.hashSync(this.hash, bcrypt.genSaltSync(10), null);
});

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
