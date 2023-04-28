import dotenv from "dotenv"
import path from "path"

// Setting up path
const absolutePath = path.resolve(__dirname, "../../.env")
dotenv.config({path: absolutePath})


const MONGO_URL = process.env.MONGO_URL || ``;


const PORT = process.env.PORT || 3000;



const JWT_SECRET=process.env.JWT_SECRET || `secret`;
const JWT_LIFETIME=process.env.JWT_LIFETIME || `1h`;

export const config = {
    mongo:{
        url:MONGO_URL,
    },
    server:{
        port:PORT,
    },
    jwt:{
        secret:JWT_SECRET,
        lifetime:JWT_LIFETIME,
    }

}