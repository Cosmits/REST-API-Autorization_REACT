import userService from "../services/userService.js";
import {validationResult} from "express-validator";

class UserController {

    async registration(req, res, next) {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                console.log("Error validation mail \n", validationError.array());
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 31 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(userData);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message});
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 31 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(userData);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message});
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.status(200).json(token);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message});
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 31 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(userData);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message});
        }
    }

    async activationsAccount(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activationsAccount(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message});
        }
    }

    async getAllUsers(request, response, next) {
        try {
            const allData = await userService.getAllUsers();
            return response.status(200).json(allData);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: e.message});
        }
    }
}

export default new UserController();
