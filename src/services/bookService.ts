import BookModel from "../models/book";
import { IBookRequest } from "../interfaces";

export default class BookService {
    async bookCab(request: IBookRequest) {
        let response, error;
        try {
            let bookRequest = {
                start: { type: "Point", coordinates: [request.start.longitude, request.start.latitude] },
                end: { type: "Point", coordinates: [request.end.longitude, request.end.latitude] },
                bookedBy: request.bookedBy
            }
            response = await BookModel.create(bookRequest);
        } catch (exception) {
            console.log("Exception occured:", exception);
            error = exception;
        }
        return { data: response, error: error };
    }

    async getBookings(pageOptions: { page: number, limit: number }) {
        let response, error;
        try {
            response = await BookModel.find({})
                .skip(pageOptions.page * pageOptions.limit)
                .limit(pageOptions.limit);
        } catch (exception) {
            console.log("Exception occured:", exception);
            error = exception;
        }
        return { data: response, error: error };
    }
}
