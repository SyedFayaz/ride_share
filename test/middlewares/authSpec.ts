const auth = require("../../src/middlewares/auth");
import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import jwt from "jsonwebtoken";

describe("@auth", () => {
    let request, response;
    let verifyStub: SinonStub;
    beforeEach(() => {
        verifyStub = Sinon.stub(jwt, "verify");
        request = {
            headers: {
                authorization: "Bearer token"
            },
            user: {
                email: "someone@nyc.com"
            }
        }, response = {
            status: () => {
                return {
                    json: () => {
                        return "";
                    }
                }
            }
        }
    });

    afterEach(() => {
        verifyStub.restore();
    });
    it("should not call verify when authorization header is missing", () => {
        request.headers.authorization = null;
        auth.verify(request, response, () => { });
        Sinon.assert.neverCalledWith(verifyStub);
    });
    it("should verify authorization header", (done) => {
        verifyStub.returns({ data: { email: "someone@nyc.com" } })
        auth.verify(request, response, () => {
            expect(request.user).to.deep.equal({ email: "someone@nyc.com" });
            Sinon.assert.calledWith(verifyStub)
            done();
        });
    });
    it("should catch exception", (done) => {
        verifyStub.throws({ error: "Failed to verify token" })
        auth.verify(request, response, () => {
            Sinon.assert.calledWith(verifyStub)
            done();
        });
    });
});