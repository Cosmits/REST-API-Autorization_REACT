import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    active: {type: Boolean, default: false},
    activationLink: {type: String},
});

export default mongoose.model("UserModel", UserModel);
