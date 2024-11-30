/**
 * @desc generate and verify jwt
 */
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId) => {
    const token = jwt.sign({userId}, process.env.TOKEN_SECRET, { expiresIn: '3600s' } );
    return token;
}
export const verifyAccessToken = (token) => {
    try{
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }catch(error){
        throw error;
    }
}
