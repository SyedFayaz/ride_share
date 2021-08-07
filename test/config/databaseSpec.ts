import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import { Database } from "../../src/config/database";
import mongoose from "mongoose";

describe("@database", () => {
    let connectStub: SinonStub;
    beforeEach(() => {
        connectStub = Sinon.stub(mongoose, "connect");
    });

    afterEach(() => {
        connectStub.restore();
    });
    it("connect to database", async () => {
        connectStub.resolves({});

        await Database.connect();

        Sinon.assert.calledWith(connectStub, undefined, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    });
    it("catch any exception", async () => {
        Sinon.stub(process, 'exit');
        connectStub.rejects({ error: "Db Connection failed" });

        await Database.connect();

        Sinon.assert.calledWith(connectStub, undefined, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    });
});