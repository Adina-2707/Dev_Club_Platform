import { Schema, model } from 'mongoose';

interface IUser {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserModel = model('User', userSchema as any);

export default UserModel;