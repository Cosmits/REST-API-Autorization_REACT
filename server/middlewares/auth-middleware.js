import tokenService from "../services/tokenService.js";

export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw next(new Error(`Error 1 authorization with accessToken`));
        }

        const arr = authorizationHeader.split(" ");
        const accessToken = arr[1];
        if (!accessToken) {
            throw next(new Error(`Error 2 authorization with accessToken`));
        }

        const userData = tokenService.verifyAccessToken(accessToken);
        if (!userData) {
            throw next(new Error(`Error verifyAccessToken with accessToken`));
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(new Error(`Error 3 authorization with accessToken`));
    }
}
