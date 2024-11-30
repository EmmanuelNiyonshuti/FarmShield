import bcrypt from 'bcrypt';
import User from "../models/User.js";

class AuthController {
    static async register (req, res){
        const reqFields = ['name', 'email', 'password'];
        for (let field of reqFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
        const { name, email, password } = req.body;
        if (password.length < 6){
            return res.status(400).json({ error: 'Use at least 6 characters for password'});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(409).json({ msg: `User with email ${email} already exists, please use another email`});
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
        const existingUser = await User.findOne({ email });
        if (!existingUser){
            return res.status(404).json({ msg: 'User not Found'});
        }
        if (!await bcrypt.compare(existingUser.password, password)){
            return res.status(401).json('Unauthorized');
        }
        return res.status(200).json({ existingUser })
    }
    static async logout (req, res){

    }
    static async me (req, res){

    }
}

export default AuthController;
