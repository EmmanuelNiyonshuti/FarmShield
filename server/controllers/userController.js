import bcrypt from 'bcrypt';
import User from "../models/User.js";
import { generateAccessToken, verifyAccessToken } from '../utils/jwt.js';

class AuthController {
    static async register (req, res){
        const reqFields = ['name', 'email', 'password'];
        for (let field of reqFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
        const { name, email, password } = req.body;
        if (password.length < 5){
            return res.status(400).json({ error: 'Use at least 6 characters for password'});
        }
        const user = await User.findOne({ email });
        if (user){
            return res.status(409).json({ msg: `User with ${email} already exists, please use another email`});
        }
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name,
            email,
            password: hashedPwd,
        });
        await newUser.save();
        return res.status(201).json
        ({
            msg: 'New User created successfully',
            name: newUser.name,
            id: newUser._id,
        });
    }
    static async login (req, res){
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user){
            return res.status(404).json({ msg: 'User not Found'});
        }
        const pwdValid = await bcrypt.compare(password, user.password)
        if (!pwdValid){
            return res.status(401).json({error: 'Invalid Password'});
        }
        const access_token = generateAccessToken(user._id);
        return res.status(200).json({ msg: 'Logged in Successfully', token: access_token });
    }
    static async me (req, res){
        const user = req.user;
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    }
}

export default AuthController;
