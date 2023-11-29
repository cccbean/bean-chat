const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require('dotenv').config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDb = process.env.DB_URL;
mongoose.connect(mongoDb);
const db = mongoose.connection;
console.log('connected to db');
db.on('error', console.error.bind(console, 'mongo connection error'));

const User = mongoose.model('User', new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  friends: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
}))



const app = express();

app.get("/", (req, res) => {
  res.send('hello world')
});

app.listen(3000, () => console.log("app listening on port 3000!"));
