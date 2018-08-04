import * as mongoose from "mongoose";

const savedArticleSchema = new mongoose.Schema({

    name: String,
    content: String,
});

const SavedArticle = mongoose.model("SavedArticle", savedArticleSchema);

export default SavedArticle;
