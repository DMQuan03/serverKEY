const KEY = require("../model/key.js")

const keyController = {
    createKEY: async (req, res) => {
        try {

            if (!req.body) return res.status(404).json({
                success: true,
                messgae: "body isCorrect"
            })
            const { social, key, expried } = await req.body
            const checkKEY = await KEY.findOne({ key_name: key })
            if (checkKEY) return res.status(500).json({
                success: false,
                message: "key already exits"
            })
            const newKEY = await new KEY({
                social,
                key_name: key,
                expried
            })
            await newKEY.save()
            return res.status(200).json({
                success: true,
                message: "created key successfully",
                data: {}
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `created key failed ${error?.message}`,
                data: null
            })
        }
    },
    checkKEY: async (req, res) => {
        try {
            const { key } = await req.query
            const result = await KEY.findOne({ key_name: key })
            if (result) {
                const now = await new Date()
                if (!result.isLock) {
                    if (now > result.expried) {
                        return res.status(403).json({
                            success: false,
                            message: "key expried",
                            data: null
                        })
                    } else return res.status(403).json({
                        success: true,
                        message: "success",
                        data: {
                            key: result.key_name,
                            social: result.social,
                            expried: result.expried
                        }
                    })
                } else return res.status(403).json({
                    success: false,
                    message: "key lock",
                    data: null
                })
            } else return res.status(404).json({
                success: false,
                message: "key not found",
                data: null
            })
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: "get key failed"
            })
        }
    },
    getKEY: async (req, res) => {
        try {
            const result = await KEY.find()
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "get failed"
            })
        }
    }
}

module.exports = keyController