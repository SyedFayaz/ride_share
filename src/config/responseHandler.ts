import Error from "./errors";
export default class ResponseHandler {
    static format(response) {
        let message = {
            status: 500, body: null
        }
        if (response.data && !response.error) {
            message.status = 200
            message.body = response.data;
        } else if (response.error && !response.data) {
            if (response.error.status) {
                message.status = response.error.status;
                message.body = response.error.message;
            } else {
                message.status = Error.OTHERS.status;
                message.body = Error.OTHERS.message;
            }
        } else if (response.data && response.error) {
            message.status = 204;
            message.body = response.data;
        } else {
            message.status = Error.OTHERS.status
            message.body = Error.OTHERS.message;
        }
        return message;
    }
}