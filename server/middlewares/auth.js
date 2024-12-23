import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";

const authUser = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return res.status(400).json({
                error: 'Authorization header is required'
            });
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.status(401).json({
                error: 'Invalid authorization header format. Expected "Bearer <token>"'
            });
        }
        const authToken = parts[1];
        const decoded = verifyAccessToken(authToken);
        const user = await User.findOne({_id: decoded.userId });
        if (!user){
            return res.status(401).json({
                error: 'Invalid authentication credentials'
            });
        }
        req.user = user;
        next();
    }catch(error){
        if (error.name === 'JsonWebTokenError'){
            return res.status(401).json({
                error: 'Invalid token'
            });
        }if (error.name === 'TokenExpiredError'){
           return res.status(401).json({
            error: 'Token has expired'
           })
        }
        return res.status(500).json({
            error: 'Internal server error'
        })
    }
}
export default  authUser;
