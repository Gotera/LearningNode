import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://gotera:123@cluster0.m0pxfzd.mongodb.net/NodeExpressLearn");

let db = mongoose.connection;
export default db;