import mongoose, {HydratedDocument, Model} from "mongoose";
import {UserFields} from "../types";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateToken(): void;
}

interface UserVirtuals {
    confirmPassword: string;
}

const ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
};

export const generateTokenJWT = (user: HydratedDocument<UserFields>) => {
    return jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: "365d"});
}

export const JWT_SECRET = process.env.JWT_SECRET || 'default_fallback_secret';

type UserModel = Model<UserFields, {}, UserMethods>;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const UserSchema = new mongoose.Schema<
    HydratedDocument<UserFields>,
    UserModel,
    UserMethods,
    {},
    UserVirtuals
>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: async function(value: string): Promise<boolean> {
                    return emailRegex.test(value);
                },
                message: "This is email is invalid"
            },
            {
                validator: async function(value: string): Promise<boolean> {
                    if(!this.isModified('email')) return true;
                    const user: HydratedDocument<UserFields> | null = await User.findOne({email: value});
                    return !user;
                },
                message: "This is email is already taken"
            }
        ]
    },
    displayName:  {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
        required: true,
    },
});

UserSchema.methods.checkPassword = async function (password: string){
    return await argon2.verify(this.password, password);
}

UserSchema.methods.generateToken = function (){
    this.token = generateTokenJWT(this);
}

UserSchema.pre('save', async function (next){
    if (!this.isModified("password")) return next();

    this.password = await argon2.hash(this.password, ARGON2_OPTIONS);
    next();
});

UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    }
})

const User = mongoose.model('User', UserSchema);
export default User;