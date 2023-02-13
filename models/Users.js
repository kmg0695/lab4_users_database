import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    geo: {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
  },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true },
  },
});

UserSchema.path("username").validate((value) => {
  return value.length >= 4;
}, "Username must have length >=4");

UserSchema.path("email").validate((value) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}, "Email must be a valid email");

UserSchema.path("address.city").validate((value) => {
  return /^[a-zA-Z ]+$/.test(value);
}, "City name must be alphabets and space");

UserSchema.path("website").validate((value) => {
  return /^(http|https):\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/.test(value);
}, "Website must be a valid web URL address (http or https is valid)");

UserSchema.path("address.zipcode").validate((value) => {
  return /^\d{5}-\d{4}$/.test(value);
}, "Zip code format must be like 12345-1234 (DDDDD-DDDD, D = digit)");

UserSchema.path("phone").validate((value) => {
  return /^\d{1}-\d{3}-\d{3}-\d{4}$/.test(value);
}, "Phone format must be like 1-123-123-1234 (D-DDD-DDD-DDD, D = digit)");

export default mongoose.model("Users", UserSchema);
