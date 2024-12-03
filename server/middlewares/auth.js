import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";

const authUser = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return res.status(400).json({msg: 'Authorization header is required'});
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.status(401).json({ error: 'Invalid authorization header format. Expected "Bearer <token>"' });
        }
        const authToken = parts[1];
        const validToken = verifyAccessToken(authToken);
        const user = await User.findOne({_id: validToken.userId });
        if (!user){
            return res.status(404).json({error: 'User not Found' });
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}
export default  authUser;
