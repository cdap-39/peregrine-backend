import * as mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    category : {},
    image: String,
    index : String,
    type: String,
    subject: String,
    content: String

});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
