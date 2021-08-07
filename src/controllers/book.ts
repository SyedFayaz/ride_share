import BookService from "../services/bookService";
import { IBookRequest } from "../interfaces";

export default class BookController {
    public async bookCab(requestBody: IBookRequest): Promise<any> {
        let bookService = new BookService();
        return bookService.bookCab(requestBody);
    }

    public async getBookings(param?: any) {
        let pageOptions = {
            page: parseInt(param?.page) || 0,
            limit: parseInt(param?.limit) || 0
        }
        let bookService = new BookService();
        return bookService.getBookings(pageOptions);
    }
}

