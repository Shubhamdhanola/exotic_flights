import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyCode: {
        type: String,
        required: [true, "Code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const UserModel = (mongoose.models.User) || (mongoose.model("User", UserSchema));

export default UserModel
