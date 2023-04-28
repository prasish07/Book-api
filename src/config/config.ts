import dotenv from "dotenv"

dotenv.config({path:"../.env"});

const username = process.env.username || "hello";
const password = process.env.password || "";

const MONGO_URL = process.env.MONGO_URL || `mongodb+srv://Prasish_shrestha:nayathimi0099@nodeexpressprojects.yrfczb4.mongodb.net/Book?retryWrites=true&w=majority`;


const PORT = process.env.PORT || 3000;

const JWT_SECRET="eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJQcmFzaXNoIn0.MHn5I7s697P_s1Y-fT8O77EFCrG_2DkH0Pjr032JZqw"
const JWT_LIFETIME='1d'

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