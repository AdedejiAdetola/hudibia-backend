import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userType: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true }
})

export default mongoose.model('User', userSchema);