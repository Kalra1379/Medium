import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});

const User = mongoose.model('User', authSchema);

export default User;