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

// const createTempUser = async () => {
//   const newUser = new User({
//     username: 'rosa',
//     password: 'lina',
//   })
//   await newUser.save();
// }
// createTempUser();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
				userId: username,
				user: username,
			},
			secret,
			{ expiresIn: '1h' }
		);
		res.status(200).json({ token });
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

io.on('connection', (socket) => {
	socket.emit('hola', 'hi');
});

httpServer.listen(3000, () => console.log('server listening on port 3000'));
