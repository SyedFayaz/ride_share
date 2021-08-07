import { expect } from "chai";
import PingController from "../../src/controllers/ping";

describe("@pingSpec", () => {
    it("should return ok status", async () => {
        let controller = new PingController();
        let response = await controller.getMessage();
        expect(response).to.deep.equal({ data: "ok" });
    })
});