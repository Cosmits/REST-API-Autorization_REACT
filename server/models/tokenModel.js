import mongoose from "mongoose";

const TokenModel = new mongoose.Schema({
    email: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    refreshToken: {type: String, required: true},
});

export default mongoose.model("TokenModel", TokenModel);