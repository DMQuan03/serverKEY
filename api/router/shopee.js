const Router = require("express").Router()
const ctrls = require("../controllers/key")
const middle = require("../middleware/middle")
Router.get("/", middle.authenKEY, ctrls.checkKEY)
Router.get("/asd1238asd-asd234-5fdsacuasd-5435cahsd-543245reasdc/", middle.authentication, ctrls.getKEY)
Router.post("/asd34gasd-543fdsdasdasd-650asd-asfitnnac-kouvjsklloa/", middle.authentication, ctrls.createKEY)

module.exports = Router