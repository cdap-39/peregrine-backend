import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    payment: String,
    username : {type : String, unique: true},
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
