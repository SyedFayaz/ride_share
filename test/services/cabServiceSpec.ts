import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import CabModel from "../../src/models/cab";
import CabService from "../../src/services/cabService";

describe("@cabService", () => {

    let findStub: SinonStub;
    beforeEach(() => {
        findStub = Sinon.stub(CabModel, "find");
    });

    afterEach(() => {
        findStub.restore();
    });
    let request = {
        coordinates: [10, 20], maxDistanceInMeters: 1000, pageOptions: { page: 1, limit: 5 }
    };
    describe("getNearbyCabs", () => {
        it("should get nearby cabs", async () => {
            let service = new CabService();
            findStub.returns({
                where: function () {
                    return {
                        near: function () {
                            return {
                                skip: function () {
                                    return {
                                        limit: function () {
                                            return { "cabNumber": "AECY8976" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            let response = await service.getNearbyCabs(request);

            expect(response).to.deep.equal({ "cabNumber": "AECY8976" });
            Sinon.assert.calledWith(findStub, {});
        });
    });
});