export default class Error {
    static INCORRECT_PASSWORD = {
        status: 401,
        message: "Incorrect password"
    };
    static USER_NOT_FOUND = {
        status: 404,
        message: "User not found"
    }
    static OTHERS = {
        status: 500,
        message: "Internal server error"
    }
    static PARTIAL_RESPONSE = {
        status: 204,
        message: "Partial success"
    }
}