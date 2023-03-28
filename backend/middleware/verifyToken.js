import jwt from 'jsonwebtoken'
export const verifytoken = async (req, res, next) => {
    try {
        var token = req.header("Authorization")
        let jwtsecretkey = "SECRET_KEY";
        if (!token) {
            res.send({ status: true, message: "Invalid Token" })
        }
        const decode = jwt.verify(token, jwtsecretkey);
        req.user = decode;
        next();
    }
    catch (e) {
        return res.send({ status:false, message: "Failed", result: e })
    }
}