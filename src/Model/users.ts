import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    birthday: String,
    password: String,
    payment: String,
    username : {type : String, unique: true},
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
