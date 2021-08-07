import UserService from "../services/userService";

export default class UserController {
    public async login(request: any): Promise<any> {
        let userService = new UserService();
        return userService.login(request);
    }

    public async signup(request: any): Promise<any> {
        let userService = new UserService();
        return userService.signup(request);
    }
}