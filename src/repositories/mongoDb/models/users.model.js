import mongoose from 'mongoose';
// const ObjectID = require("mongodb").ObjectID;

const { Schema } = mongoose;

const usersSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  country: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'REGULAR',
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    required: [true, 'createdAt is required'],
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: [true, 'udpatedAt is required'],
    default: Date.now(),
  },
});

const users = mongoose.model('users', usersSchema);
export default users;
