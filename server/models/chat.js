const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  name: {type: String, required: true},
	users: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
	isTyping: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
});

module.exports = mongoose.model('Chat', ChatSchema);
