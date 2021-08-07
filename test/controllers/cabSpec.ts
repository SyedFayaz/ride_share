import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import CabController from "../../src/controllers/cab";
import CabService from "../../src/services/cabService";

describe("@cabSpec", () => {
    let getNearbyCabsStub: SinonStub;
    beforeEach(() => {
        getNearbyCabsStub = Sinon.stub(CabService.prototype, "getNearbyCabs");
    });

    afterEach(() => {
        getNearbyCabsStub.restore();
    });
    let parameters = {
        latitude: "10.000",
        longitude: "89.111",
        maxDistance: "1000",
        limit: "10",
        page: "2"
    }, parameters2 = {
        latitude: 10.000,
        longitude: 89.111,
        maxDistance: 1000

    }, request = {
        coordinates: [89.111, 10.000],
        maxDistanceInMeters: 1000,
        pageOptions: {
            page: 2, limit: 10
        }
    }, request2 = {
        coordinates: [89.111, 10.000],
        maxDistanceInMeters: 1000,
        pageOptions: {
            page: 0, limit: 0
        }
    };
    describe("getNearbyCab", () => {
        it("should sanitize parameters", async () => {
            let controller = new CabController();
            getNearbyCabsStub.resolves({ cabNumber: "AE4534" });

            let response = await controller.getNearbyCabs(parameters);

            Sinon.assert.calledWith(getNearbyCabsStub, request);
            expect(response).to.deep.equal({ cabNumber: "AE4534" });
        });
        it("should pass default pageOptions when it is not present in request", async () => {
            let controller = new CabController();
            getNearbyCabsStub.resolves({ cabNumber: "AVEN4S" });

            let response = await controller.getNearbyCabs(parameters2);

            expect(response).to.deep.equal({ cabNumber: "AVEN4S" });
            Sinon.assert.calledWith(getNearbyCabsStub, request2);
        });
    });
});