const limiter = require("../../src/middlewares/limiter");
import { expect } from "chai";

describe("@limiter", () => {
    let request, response;
    beforeEach(() => {
        request = {
            headers: {
                authorization: "Bearer token"
            },
            user: {
                email: "someone@nyc.com"
            }
        }, response = {
            status: () => {
            },
            limitHeader: "",
            setHeader: function (value) {
                this.limitHeader = value;
            },
        }
    });
    it("should initialize rate limiting of api with default configuration", () => {
        limiter.rateLimit(request, response, () => {
            expect(response.limitHeader).to.equal("X-RateLimit-Reset");
        });
    })
});