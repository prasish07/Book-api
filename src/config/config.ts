import dotenv from "dotenv"

dotenv.config();

const username = process.env.username||"";
const password = process.env.password||"";

const MONGO_URL = `mongodb+srv://Prasish_shrestha:nayathimi0099@nodeexpressprojects.yrfczb4.mongodb.net/Book?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

export const config = {
    mongo:{
        url:MONGO_URL,
    },
    server:{
        port:PORT,
    }
}