import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
export default class UserService {
    async signup(user: { email: string, password: string }) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            await UserModel.create(user);
            return this.generateToken(user);
        } catch (exception) {
            return exception;
        }
    }

    async login(user: { email: string, password: string }) {
        try {
            const dbUser = await UserModel.findOne({ email: user.email });
            if (!dbUser) {
                //User Not found
                console.log("User not found");
                return;
            }
            const isMatch = await bcrypt.compare(user.password, dbUser.password);
            if (isMatch) {
                console.log("ismatch");
                return this.generateToken(dbUser);
            } else {
                console.log("Paswword is wrong");
                return;
                //Passwords dont match
            }
        } catch (exception) {
            return exception;
        }
    }


    private generateToken(user) {
        return jwt.sign({ data: user }, JWT_SECRET, { expiresIn: '1h' })
    }
}