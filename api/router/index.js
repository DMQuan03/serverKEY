const shopeeRouter = require("./shopee.js")
const defaultRouter = ((app) => {
    app.use("/api/v1/shopee", shopeeRouter)
})

module.exports = defaultRouter