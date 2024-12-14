const express = require("express")
const app = express()
const PORT = 5678
const cors = require("cors")
const db = require("./config/db")
const dotenv = require("dotenv")
const defaultRouter = require("./api/router/index")
dotenv.config()
app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
db.connect()
defaultRouter(app)
app.listen(PORT, () => {
    console.log(`server is running http://127.0.0.1:${PORT}`)
})