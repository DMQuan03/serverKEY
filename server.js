const express = require("express")
const app = express()
const PORT = 5678
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
app.use(cors({
    origin: "toolvideoshopee.online",
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/shopee/api/v1/login", async (req, res) => {
    const { cookie } = await req.body
    const url = "https://banhang.shopee.vn/webchat/api/coreapi/v1.2/mini/login?csrf_token=P7gR2KvTEe%2BOwz6%2FdheT4Q%3D%3D&source=pcmall&_api_source=pcmall"
    let headers = {
        'cookie': cookie
    }
    const response = await axios.post(url, {}, { headers: headers })
    console.log(response.data)
    return res.status(200).json({
        data: response.data,
        success: true,
        message: "Login success"
    })
})

app.listen(PORT, () => {
    console.log(`server is running http://127.0.0.1:${PORT}`)
})
