#! /usr/bin/env node

console.log(
  'This script populates some test items and categoryies to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require('./models/user');
const Chat = require('./models/chat')
const Message = require('./models/message');

const users = [];
const chats = [];
const messages = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await populateUsersArray();
  await populateChatsArray();
  await populateMessagesArray();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createUser(index, username, password) {
  const user = new User({username, password});
  await user.save();
  users[index] = user;
  console.log('Added user: ', username);
}

async function createChat(index, name, users) {
  const chat = new Chat({name, users});
  await chat.save();
  chats[index] = chat;
  console.log('Added chat: ', name);
}

async function createMessage(index, user, chat, body) {
  const message = new Message({user, chat, body});
  await message.save();
  messages[index] = message;
  console.log('Added message: ', message);
}

async function populateUsersArray() {
  console.log('Adding users');
  await Promise.all([
    createUser(0, 'billy', 'bob'),
    createUser(1, 'fulano', 'fulanito'),
    createUser(2, 'fulana', 'fulanita'),
  ])
}

async function populateChatsArray() {
  console.log('Adding chats');
  await Promise.all([
    createChat(0, 'test', [users[0], users[1]]),
    createChat(1, 'fulanitos', [users[1], users[2]])
  ])
}

async function populateMessagesArray() {
  console.log('Adding messages');
  await Promise.all([
    createMessage(0, users[0], chats[0], 'hi, my name is billy'),
    createMessage(1, users[1], chats[0], 'hi, billy... I am fulano'),
    createMessage(2, users[0], chats[0], 'nice to meet you'),
    createMessage(3, users[1], chats[0], 'likewise'),
    createMessage(4, users[1], chats[1], 'sup fulana'),
    createMessage(5, users[2], chats[1], 'sup fulano'),
  ])
}
