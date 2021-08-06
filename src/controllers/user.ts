import UserService from "../services/UserService";

export default class UserController {
    public async login(request: any): Promise<any> {
        let bookService = new UserService();
        return bookService.login(request);
    }

    public async signup(request: any): Promise<any> {
        let bookService = new UserService();
        return bookService.signup(request);
    }
}