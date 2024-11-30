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
            return res.status(400).json({ error: 'Invalid authorization header format. Expected "Bearer <token>"' });
        }
        const authToken = parts[1];
        const validToken = verifyAccessToken(authToken);
        if (!validToken){
            return res.status(403).json({error: 'Invalid or expired access token'});
        }
        const user = await User.findOne({_id: validToken.userId });
        if (!user){
            return res.status(404).json({error: 'User not Found' });
        }
        req.user = user;
        next();
    }catch(error){
        console.log('Authentication error', error.message);
        return res.status(500).json({error: 'Internal server error'});

    }
}

export default  authUser;
