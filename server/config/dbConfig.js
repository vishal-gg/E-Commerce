const mongoose = require('mongoose')
const color = require('cli-colors')

const connectDb = async () => {
    try {
       const connect = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "cloudDb"
      })
        console.log(color.bgMagenta(`connected to database🟢: host: ${connect.connection.host}`))
    } catch (error) {
        console.log(color.bgRed(`Error: ${error.message || 'failed to connect database'}`))
        process.exit(1)
    }
}

module.exports = connectDb;