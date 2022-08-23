import jwt from "jsonwebtoken"
import {StatusCodes} from "http-status-codes"

const allowedRoles = ['admin', 'super']

export const adminMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            throw new Error("There is no token, user is not authorized")
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (allowedRoles.includes(decoded?.role)){
            req.admin = decoded
            next()
        }else{
            throw new Error ("Who are you?")
        }

    }catch (e) {
        console.log(e)
        return res.status(StatusCodes.UNAUTHORIZED).json({error: e.message})
    }
}