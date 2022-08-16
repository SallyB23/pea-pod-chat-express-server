require('dotenv').config()

const { MongoClient } = require('mongodb')
const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

const database = client.db('ChatDB')

async function sendMsg(newMsg) {
    try {
        client.connect()
        const messages = database.collection('messages')
        await messages.insertOne(newMsg)
    } catch(err) {
        console.log(err, "<<< error")
    } 
}

module.exports = {
    sendMsg
}