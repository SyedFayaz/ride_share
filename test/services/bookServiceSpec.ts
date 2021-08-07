import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import BookModel from "../../src/models/book";
import BookService from "../../src/services/bookService";

describe("@bookService", () => {

    let createStub: SinonStub, findStub: SinonStub;
    beforeEach(() => {
        createStub = Sinon.stub(BookModel, "create");
        findStub = Sinon.stub(BookModel, "find");
    });

    afterEach(() => {
        createStub.restore();
        findStub.restore();
    });
    let bookingData = {
        start: {
            latitude: 10.000,
            longitude: 89.111
        },
        end: {
            latitude: 12.1212,
            longitude: 23.000
        },
        bookedBy: "userId"
    }, bookRequest = {
        start: { type: "Point", coordinates: [bookingData.start.longitude, bookingData.start.latitude] },
        end: { type: "Point", coordinates: [bookingData.end.longitude, bookingData.end.latitude] },
        bookedBy: "userId"
    }
    describe("bookCab", () => {
        it("should book cab", async () => {
            let service = new BookService();
            createStub.resolves({ created: "ok" });
            let response = await service.bookCab(bookingData);

            expect(response.data).to.deep.equal({ created: "ok" });
            Sinon.assert.calledWith(createStub, bookRequest);
        });

        it("should catch exception", async () => {
            let service = new BookService();
            createStub.rejects({ "error": "create failed" });

            let response = await service.bookCab(bookingData);

            expect(response.error).to.deep.equal({ "error": "create failed" });
            Sinon.assert.calledWith(createStub, bookRequest);
        });
    });

    describe("getBookings", () => {
        it("should get all bookings", async () => {
            let service = new BookService();
            findStub.returns({
                skip: function () {
                    return {
                        limit: function () {
                            return bookingData;
                        }
                    }
                }
            })
            let response = await service.getBookings({ page: 0, limit: 0 });
            expect(response.data).to.deep.equal(bookingData);
            Sinon.assert.calledWith(findStub, {})
        });
        it("should catch exception", async () => {
            let service = new BookService();
            findStub.throws({ "error": "operation failed" });

            let response = await service.getBookings({ page: 0, limit: 0 });

            expect(response.error).to.deep.equal({ "error": "operation failed" });
            Sinon.assert.calledWith(findStub, {})
        });
    });
});