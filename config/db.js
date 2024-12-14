const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://duongminhquan:Satthu123@cluster0.ppa0s.mongodb.net/shope`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        console.log("mongoDB connected successfully")
    } catch (error) {
        console.log("mongoDB connect failed")
    }
}

module.exports = { connect }