import BookModel from "../models/book";
import { IBookRequest } from "../interfaces";

export default class BookService {
    async bookCab(request: IBookRequest) {
        let bookRequest = {
            start: { type: "Point", coordinates: [request.start.longitude, request.start.latitude] },
            end: { type: "Point", coordinates: [request.end.longitude, request.end.latitude] },
            bookedBy: request.bookedBy
        }
        const response = await BookModel.create(bookRequest);
        return response;
    }

    async getBookings(pageOptions: { page: number, limit: number }) {
        const result = await BookModel.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        return result;
    }
}
