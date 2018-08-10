import * as mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    content : String,
    senders: Array,
    status : String,
    subject: String,
    time: String,
    username : String,

});

const submitArticle = mongoose.model("SubmitArticle", ArticleSchema);

export default submitArticle;
