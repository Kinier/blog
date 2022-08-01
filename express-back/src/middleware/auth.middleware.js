import jwt from "jsonwebtoken"
import {StatusCodes} from "http-status-codes"


export const authMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            throw "There is no token, user is not authorized"
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }catch (e) {

        return res.status(StatusCodes.UNAUTHORIZED).json({error: e.message})
    }
}