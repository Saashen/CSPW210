const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
      validate: () => this.email && this.email.includes('@'),
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

UserSchema.pre('save', async function () {
  this.hash = await bcrypt.hash(this.hash, 10);
});

UserSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.hash);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
