import { expect } from "chai";
import Sinon from "sinon";
import { SinonStub } from "sinon";
import BookController from "../../src/controllers/book";
import { IBookRequest } from "../../src/interfaces";
import BookService from "../../src/services/bookService";

describe("@bookSpec", () => {
    let bookCabStub: SinonStub, getBookingsStub: SinonStub;
    beforeEach(() => {
        bookCabStub = Sinon.stub(BookService.prototype, "bookCab");
        getBookingsStub = Sinon.stub(BookService.prototype, "getBookings");
    });

    afterEach(() => {
        bookCabStub.restore();
        getBookingsStub.restore();
    });
    let bookingData: IBookRequest = {
        start: {
            latitude: 10.000,
            longitude: 89.111
        },
        end: {
            latitude: 12.1212,
            longitude: 23.000
        },
        bookedBy: "user"
    }
    describe("bookCab", () => {
        it("should book cab", async () => {
            let controller = new BookController();
            bookCabStub.resolves({ created: "ok" });

            let data = await controller.bookCab(bookingData);

            expect(data).to.deep.equal({ created: "ok" });
        });
        it("should call bookservice with passed data", async () => {
            let controller = new BookController();
            bookCabStub.resolves({ created: "ok" });

            await controller.bookCab(bookingData);

            Sinon.assert.calledWith(bookCabStub, bookingData);
        });
    });

    describe("getBookings", () => {
        it("should call bookService with default pageOptions when pageOptions are not passed", async () => {
            let controller = new BookController();
            getBookingsStub.resolves(bookingData);
            let defaultPageOptions = { limit: 0, page: 0 }

            let data = await controller.getBookings();

            expect(data).to.deep.equal(bookingData);
            Sinon.assert.calledWith(getBookingsStub, defaultPageOptions);
        });
        it("should call bookService with request pageOptions", async () => {
            let controller = new BookController();
            getBookingsStub.resolves(bookingData);
            let request = { limit: 1, page: 1 }

            let data = await controller.getBookings(request);

            expect(data).to.deep.equal(bookingData);
            Sinon.assert.calledWith(getBookingsStub, request);
        });
    });
});