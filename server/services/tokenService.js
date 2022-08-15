import jwt from "jsonwebtoken";
import TokenModel from "../models/tokenModel.js";

class TokenService {
    getNewToken(data) {
        const accessToken = jwt.sign(data, process.env.SERVER_ACCESS_TOKEN, {
            expiresIn: "1h",
        });
        const refreshToken = jwt.sign(data, process.env.SERVER_REFRESH_TOKEN, {
            expiresIn: "31d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveTokenInDB(emailId, refreshToken) {
        let tokenData = await TokenModel.findOne({email: emailId}).exec();
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
        } else {
            tokenData = await TokenModel.create({email: emailId, refreshToken});
        }
        return tokenData.save();
    }

    verifyAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.SERVER_ACCESS_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }

    verifyRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(
                refreshToken,
                process.env.SERVER_REFRESH_TOKEN
            );
            return userData;
        } catch (e) {
            return null;
        }
    }

    async delTokenInDB(refreshToken) {
        return TokenModel.deleteOne({refreshToken}).exec();
    }

    async findTokenInDB(refreshToken) {
        return TokenModel.findOne({refreshToken}).exec();
    }
}

export default new TokenService();
