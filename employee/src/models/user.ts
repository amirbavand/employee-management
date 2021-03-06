import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  Name: string;
  Surname: string;
  PhoneNumber: string;
  Address: string;
  Title: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  EmployeeId: string;
  Name: string;
  Surname: string;
  PhoneNumber: string;
  Address: string;
  Title: string;
}

const userSchema = new mongoose.Schema(
  {
    EmployeeId: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Surname: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
