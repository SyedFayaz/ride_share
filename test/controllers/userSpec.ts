import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import UserController from "../../src/controllers/user";
import UserService from "../../src/services/userService";

describe("@userSpec", () => {
    let loginStub: SinonStub, signupStub: SinonStub;
    beforeEach(() => {
        loginStub = Sinon.stub(UserService.prototype, "login");
        signupStub = Sinon.stub(UserService.prototype, "signup");
    });

    afterEach(() => {
        loginStub.restore();
        signupStub.restore();
    });
    let request = {
        email: "some@nyc.com",
        password: "som!2*(&&*^HJ"
    };
    describe("login", () => {
        it("should call userService.login with email and password", async () => {
            let controller = new UserController();
            loginStub.resolves({ token: "JWTtokenString" });

            let response = await controller.login(request);

            Sinon.assert.calledWith(loginStub, request);
            expect(response).to.deep.equal({ token: "JWTtokenString" });
        });
    });

    describe("signup", () => {
        it("should call userService.signup with email and password", async () => {
            let controller = new UserController();
            signupStub.resolves({ token: "JWTtokenString" });

            let response = await controller.signup(request);

            expect(response).to.deep.equal({ token: "JWTtokenString" });
            Sinon.assert.calledWith(signupStub, request);
        });
    })
});