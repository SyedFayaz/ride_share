import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../../src/models/user";
import UserService from "../../src/services/userService";

describe("@userService", () => {

    let createStub: SinonStub, findoneStub: SinonStub,
        jwtStub: SinonStub, compareStub: SinonStub, hashStub: SinonStub;
    beforeEach(() => {
        createStub = Sinon.stub(UserModel, "create");
        findoneStub = Sinon.stub(UserModel, "findOne");
        jwtStub = Sinon.stub(jwt, "sign");
        compareStub = Sinon.stub(bcrypt, "compare")
        hashStub = Sinon.stub(bcrypt, "hash")
    });

    afterEach(() => {
        createStub.restore();
        findoneStub.restore();
        jwtStub.restore();
        compareStub.restore();
        hashStub.restore();
    });
    let request = {
        email: "someone@nyc.com",
        password: "*ui&%tyGthy*$"
    }

    describe("signup", () => {
        it("should signup user", async () => {
            let service = new UserService();
            createStub.resolves({});
            jwtStub.returns({ token: "JWT-token-string" });

            let response = await service.signup(request);

            expect(response).to.deep.equal({ token: "JWT-token-string" });
            Sinon.assert.calledWith(createStub, request);
        });
        it("should throw exception", async () => {
            let service = new UserService();
            createStub.rejects({ "error": "create failed" });

            let response = await service.signup(request);

            expect(response).to.deep.equal({ "error": "create failed" });
            Sinon.assert.calledWith(createStub, request);
        });
    });

    describe("login", () => {
        it("should not login user when email is not found", async () => {
            let service = new UserService();
            findoneStub.resolves(null);

            await service.login(request);

            Sinon.assert.calledWith(findoneStub, { email: request.email });
        });
        it("should not login user when credentials are incorrect", async () => {
            let service = new UserService();
            findoneStub.resolves({ email: request.email, password: "hashedPassword" });
            jwtStub.returns({ token: "JWT-token-string" });
            compareStub.returns(false);

            let response = await service.login(request);

            expect(response).to.deep.equal(undefined);
            Sinon.assert.calledWith(findoneStub, { email: request.email });
        });
        it("should login user when credentials are correct", async () => {
            let service = new UserService();
            findoneStub.resolves({ email: request.email, password: "hashedPassword" });
            jwtStub.returns({ token: "JWT-token-string" });
            compareStub.returns(true);

            let response = await service.login(request);

            expect(response).to.deep.equal({ token: "JWT-token-string" });
            Sinon.assert.calledWith(findoneStub, { email: request.email });
        });
        it("should throw exception", async () => {
            let service = new UserService();
            findoneStub.rejects({ error: "Something went wrong" });

            let response = await service.login(request);

            expect(response).to.deep.equal({ error: "Something went wrong" });
            Sinon.assert.calledWith(findoneStub, { email: request.email });
        });
    });
});