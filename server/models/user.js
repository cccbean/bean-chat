const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = 	new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  friends: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
})

module.exports = mongoose.model('User', UserSchema);