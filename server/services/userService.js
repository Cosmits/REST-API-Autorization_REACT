import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import emailService from "./emailService.js";
import TokenService from "./tokenService.js";
import tokenService from "./tokenService.js";
import UserDTO from "../models/userDTO.js";

class UserService {
    async registration(email, password) {
        const tempUser = await UserModel.findOne({email}).exec();
        if (tempUser) {
            throw new Error(`User ${email} already registered`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            activationLink,
        });

        await emailService.SendActivationLink(
            email,
            `${process.env.API_URL}/api/activations/${activationLink}`
        );

        const userDTO = new UserDTO(user);
        const twoTokens = TokenService.getNewToken({...userDTO});
        await TokenService.saveTokenInDB(userDTO.id, twoTokens.refreshToken);

        return {...twoTokens, user: userDTO};
    }

    async activationsAccount(activationLink) {
        const tempUser = await UserModel.findOne({activationLink}).exec();
        if (!tempUser) {
            throw new Error(`Error link ${activationLink}`);
        }
        tempUser.active = true;
        return tempUser.save();
    }

    async login(email, password) {
        const tempUser = await UserModel.findOne({email}).exec();
        if (!tempUser) {
            throw new Error(`Error user ${email} not found`);
        }
        const truePass = await bcrypt.compare(password, tempUser.password);
        if (!truePass) {
            throw new Error(`Error password in user ${email}`);
        }
        const userDTO = new UserDTO(tempUser);
        const twoTokens = TokenService.getNewToken({...userDTO});
        await TokenService.saveTokenInDB(userDTO.id, twoTokens.refreshToken);

        return {...twoTokens, user: userDTO};
    }

    async logout(refreshToken) {
        return TokenService.delTokenInDB(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error(`Error authorization with refreshToken`);
        }
        const userData = tokenService.verifyRefreshToken(refreshToken);
        const token = await tokenService.findTokenInDB(refreshToken);
        if (!userData || !token) {
            throw new Error(`Error authorization with refreshToken`);
        }
        const tempUser = await UserModel.findOne({email: userData.email}).exec();
        if (!tempUser) {
            throw new Error(`Error user ${userData.email} not found`);
        }
        const userDTO = new UserDTO(tempUser);
        const twoTokens = TokenService.getNewToken({...userDTO});
        await TokenService.saveTokenInDB(userDTO.id, twoTokens.refreshToken);

        return {...twoTokens, user: userDTO};
    }

    async getAllUsers() {
        return UserModel.find().exec();
    }
}

export default new UserService();
