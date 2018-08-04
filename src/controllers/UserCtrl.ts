// import * as dotenv from "dotenv";
import Article from "../Model/articles";
import SavedArticle from "../Model/savedArticles";

export default class UserCtrl  {

    public GetTaUserCtrl() {
        return UserCtrl;
    }

    public login(req: any, res: any) {

       return res.status(200).json("success");

    }

    public signUp = (req: any, res: any) => {

             return res.status(200).json("success");

    }
    public getAllArticles(req: any, res: any) {
        console.log("request");
        Article.find({}).then((response: any) => {
             console.log(response)  ;
             const articles: any[] = [];
             response.forEach((item: any) => {
                    articles.push(item);
                });
             console.log(articles);
             return res.status(200).json(articles);
            }).catch((err: Error) => {
                 return res.status(401).json(err.message.toString());
            });

    }
    public getAllsavedArticles(req: any, res: any) {
        console.log("request");
        SavedArticle.find({}).then((response: any) => {
             console.log(response)  ;
             const articles: any[] = [];
             response.forEach((item: any) => {
                    articles.push(item);
                });
             console.log(articles);
             return res.status(200).json(articles);
            }).catch((err: Error) => {
                 return res.status(401).json(err.message.toString());
            });

    }
     public getArticlesCategories(req: any, res: any) {

                return res.status(200).json("success");

    }
    public saveArticles(req: any, res: any) {

                console.log(req.body);
                const article = JSON.parse(JSON.stringify(req.body));
                const saveingArticle = new SavedArticle(article);
                saveingArticle.save((error: Error, data: any) => {
                            if (error) {
                               return res.status(401).json("success");
                            } else {
                                 return res.status(200).json("success");
                            }

                 });

    }
      public summarize(req: any, res: any) {

            console.log(req.body.content);
         var request = require('request');

         request.post({url:'https://api.smmry.com?SM_API_KEY=B32147B183&SM_LENGTH=3&CURLOPT_HTTPHEADER=array("Expect:")&CURLOPT_FOLLOWLOCATION=true&CURLOPT_RETURNTRANSFER=true&CURLOPT_CONNECTTIMEOUT=20&CURLOPT_TIMEOUT=20', form: {"sm_api_input": req.body.content}}, function(err:any,httpResponse:any,body:any){

             console.log('error:', err); // Print the error if one occurred
              console.log('statusCode:', httpResponse && httpResponse.statusCode); // Print the response status code if a response was received
              console.log('body:', body); // Print the HTML for the Google homepage.
             if(err){
                  return res.status(401).json("Summrize cannot be done");
             }else {
                 if(JSON.parse(body).sm_api_message === 'TEXT IS TOO SHORT2'){
                     return res.status(200).json("Sorry we can't summarize this article,Content is too short!!");
                 }else{
                     return res.status(200).json(JSON.parse(body).sm_api_content);
                 }

             }
         });



    }
    public deleteArticles(req: any, res: any) {
         console.log(req.params.id)
         SavedArticle.findOneAndRemove({ _id: req.params.id }, (error2: Error) => {
                                    if (error2) {
                                         console.log(error2.message);
                                         return res.status(200).json(error2.message);
                                    } else {
                                         return res.status(200).json("artilce deleted.");
                                    }
                                 });
    }

}
