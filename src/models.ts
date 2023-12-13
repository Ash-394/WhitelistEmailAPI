import mongoose, { Document, Schema, Types } from 'mongoose';

class UserModel {
  _id: Types.ObjectId; // Use ObjectId as the primary key
  name: string;
  email: string;
  bio: string;
  age: number;
  image: string;
  resume: string;

  constructor(name: string, email: string, bio: string, age: number, image: string, resume: string) {
    this._id = new Types.ObjectId(); // Generate a new ObjectId for each instance
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.age = age;
    this.image = image;
    this.resume = resume;
  }
}

// Define the User schema using Mongoose Schema
const UserSchema = new Schema<UserModel>({
  _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
  resume: { type: String, required: true },
});

// Create the User model using the schema
export const User = mongoose.model('User', UserSchema);
