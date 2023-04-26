import mongoose,{Document,Schema} from "mongoose";

interface IBook extends Document{
    title: string;
  author: string;
  genre: string[];
  price: number;
  description: string;
}

const bookSchema: Schema = new Schema({
title: {
    type: String,
    required: [true, "Please enter the title of the book"],
    unique: true,
    maxLength: [100, "Title cannot be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Please enter the author of the book"],
  },
  genre: {
    type: [String],
    required: [true, "Please enter at least one genre of the book"],
    validate: {
      validator: function (val: string[]) {
        return val && val.length > 0;
      },
      message: "Please enter at least one genre of the book",
    },
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the book"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description of the book"],
    minLength: [50, "Description cannot be less than 50 characters"],
  },
})

export default mongoose.model<IBook>("Book", bookSchema);