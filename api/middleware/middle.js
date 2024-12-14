
const middle = {
    authentication: (req, res, next) => {
        const authenKeyAdmin = req.headers["x_key_admin_q"]
        if (authenKeyAdmin !== "rteasd-ager34-rffd454-65422d-quan300503") {
            return res.status(403).json({
                success: false,
                message: "cant post",
                data: null
            })
        }
        next()
    },
    authenKEY: (req, res, next) => {
        const { x_key_q } = req.headers
        if (x_key_q !== "asduc-as914-kspod-qaaa342-quan300503") {
            return res.status(403).json({
                success: false,
                message: "isCorrect",
                data: null
            })
        }
        next()
    }
}

module.exports = middle