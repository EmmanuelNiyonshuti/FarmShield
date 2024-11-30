import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [25, 'Name can\'t exceed 25 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters"]

    }
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema);

export default User;
