import mongoose from "mongoose";
const { MONGO_URI } = process.env;
export class Database {

    static async connect() {
        try {
            await mongoose
                .connect(MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                });
            console.log("Connected to DB");
        } catch (exception) {
            console.log(`Database connection failed due to : ${exception}`);
            process.exit(1);
        }
    }
}