import { validateToken } from "../services/authService.js";

export const isUserAuthenticated = (tokenName) => {
    return (req, res, next) => {
        const token = req.cookies[tokenName];

        if (token) {
            try {
                const user = validateToken(token);
                req.user = user;
            } catch (error) {

            }
        }
        return next();
    }
}