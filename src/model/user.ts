import mongoose,{Document,Model,Schema} from "mongoose";
import bcrypt from "bcryptjs";

interface Iuser extends Document{
    email: string;
    password:string;
    role: "user" | "admin" |"librain";
    status?: "active" | "blocked";
}

interface IUserModel extends Model<Iuser> {
  comparePassword(user: Iuser, password: string): Promise<boolean>; 
}

const UserSchema: Schema = new Schema({
    email:{
        type:String,
        required:[true,"Please enter the email of the user"],
        unique:true,
        maxLength:[100,"Email cannot be more than 100 characters"],
    },
    password:{
        type:String,
        required:[true,"Please enter the password of the user"],
        minLength:[8,"Password cannot be less than 8 characters"],
    },
    role:{
        type:String,
        enum:["user","admin","librarian"],
    },
    status:{
        type:String,
        enum:["active","blocked"],
        default:"active",
    }
},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

export default mongoose.model<Iuser>("User", UserSchema);