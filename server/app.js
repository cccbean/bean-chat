const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const mongoDb = process.env.DB_URL;
mongoose.connect(mongoDb);
const db = mongoose.connection;
console.log('connected to db');
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();
const User = require('./models/user');
const Chat = require('./models/chat');
const Message = require('./models/message')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: implement bcrypt
app.post('/login', async (req, res, next) => {
	try {
		console.log(req.body);
		const username = req.body.username;
		const password = req.body.password;
		const user = await User.findOne({ username, password });
		if (!user) {
			return res.json('user not found');
		}

		const secret = process.env.JWT_SECRET;
		const token = jwt.sign(
			{
				userId: user._id,
				user: username,
			},
			secret,
			{ expiresIn: '1h' }
		);
		user.password = undefined;
		res.status(200).json({ token, user });
	} catch (err) {
		next(err);
	}
});

// TODO: sanitize form data
app.post('/signup', async (req, res, next) => {
	try {
		console.log(req.body);
		const newUser = new User({
			username: req.body.username,
			password: req.body.password,
		});
		await newUser.save();
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

io.use((socket, next) => {
	try {
		const token = socket.handshake.auth.token;
		const secret = process.env.JWT_SECRET;
		const decoded = jwt.verify(token, secret);
		console.log(decoded);
		next();
	} catch (err) {
		next(new Error('unauthorized'));
	}
});

io.on('connection', async (socket) => {
	socket.emit('hola', 'hi');

	const chats = await getUserChats(socket);
	socket.emit('chats', chats);

	socket.on('search-request', async (data) => {
		console.log(data);
		if (data.query === '') {
			socket.emit('search-response', []);
			return;
		}
		const myId = new mongoose.Types.ObjectId(data.myId);
		const regex = new RegExp(data.query, 'i');
		const users = await User.find({ username: regex })
			.where('_id').ne(myId)
			.select('-password')
			.sort({ username: 1 })
			.exec();
		// TODO: error check
		socket.emit('search-response', users);
	});

	socket.on('new-chat-request', async (data) => {
		// TODO: add check to see if chat already exists
		const userId = new mongoose.Types.ObjectId(data.myId);
		const user = await User.findById(userId);
		const otherId = new mongoose.Types.ObjectId(data.otherId);
		const otherUser = await User.findById(otherId);
		const newChat = new Chat({
			name: `${user.username} + ${otherUser.username}`,
			users: [user, otherUser],
		});
		await newChat.save();
		// TODO: error handling
		const chats = await getUserChats(socket);
		console.log('Chats:', chats);
		socket.emit('chats', chats);
	});

	socket.on('get-chat-request', async (data) => {
		// TODO: check to see if chatId contains userId?
		const messages = await Message.find({chat: data.chatId}).sort({createdAt: 1}).exec();
		console.log('get-chat', messages, 'get chat');
		socket.emit('get-chat-response', messages)
	})

	socket.on('new-message-request', async (data) => {
		console.log(data)
		const userId = new mongoose.Types.ObjectId(data.user);
		const chatId = new mongoose.Types.ObjectId(data.chat);
		const newMessage = new Message({
			user: userId,
			chat: chatId,
			message: data.message,
		});
		await newMessage.save();
		// TODO: handle error
		console.log(newMessage);
		socket.emit('help', newMessage);
	})
});

async function getUserChats(socket) {
	const token = socket.handshake.auth.token;
	const secret = process.env.JWT_SECRET;
	const decoded = jwt.verify(token, secret);
	const chats = await Chat.find({ users: decoded.userId }).exec();
	// TODO: error check
	return chats;
}

httpServer.listen(3500, () => console.log('server listening on port 3500'));
