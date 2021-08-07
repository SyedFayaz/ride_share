import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Error from "../config/errors";
const { JWT_SECRET } = process.env;

export default class UserService {
    async signup(user: { email: string, password: string }) {
        let response, error;
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            await UserModel.create(user);
            response = this.generateToken(user);
        } catch (exception) {
            console.log("Exception occured:", exception);
            error = exception;
        }
        return { data: response, error: error };
    }

    async login(user: { email: string, password: string }) {
        let response, error;
        try {
            const dbUser = await UserModel.findOne({ email: user.email });
            if (!dbUser) {
                return { data: response, error: Error.USER_NOT_FOUND };
            }
            const isMatch = await bcrypt.compare(user.password, dbUser.password);
            if (isMatch) {
                response = this.generateToken(dbUser);
            } else {
                return { data: response, error: Error.INCORRECT_PASSWORD }
            }
        } catch (exception) {
            console.log("Exception occured:", exception);
            error = exception;
        }
        return { data: response, error: error };
    }


    private generateToken(user) {
        return jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '1h' })
    }
}