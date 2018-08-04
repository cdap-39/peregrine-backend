import Article from "../Model/articles";
import ApiService from "../services/api.service";

export default class ArtclesCtrl {

    public GetArtclesCtrl() {
        return ArtclesCtrl;
    }
    public predictCategory(req: any, res: any) {
        console.log("request recived:" + req.body.searchKey);
        const search: string = req.body.searchKey;
        ApiService.getInstance().getArticles(search).then((data: any) => {

               console.log(data);
               // data  = JSON.parse(data);
               // let content:any = data["hits"]["hits"][0]["_source"]["content"];
               console.log("get article recived");
               const article: any[] = [];
               for (let i = 0 ; i < 5 ; i++) {
                   const cont = "subject:" + data.hits.hits[i]._id.toString() + ".";
                   article.push(cont + data.hits.hits[i]._source.content.toString().replace(/\n/g, "")
                       .replace(/\r/g, "").replace(/'/g, ""));
               }
               console.log(article);
               console.log("send to get categories");
               ApiService.getInstance().getArticlesCategory(article).then((categories: any) => {

                       categories = categories.toString().replace(/'/g, '"');
                       const categoriesData  = JSON.parse(categories);
                       console.log(categoriesData);
                       const articleJson: any[] = [];
                       for (let i = 0 ; i < 5 ; i++) {
                            console.log(categoriesData[i]);
                            articleJson.push({category: categoriesData[i], article: article[i]});
                            const articleData = {
                                category : categoriesData[i],
                                image : "",
                                type: data.hits.hits[i]._type,
                                index : data.hits.hits[i]._index,
                                subject : data.hits.hits[i]._id,
                                content : data.hits.hits[i]._source.content,
                                };
                            const newArticle = new Article(articleData);
                            newArticle.save((error, savedArticle: any) => {

                                if (error && error.code === 11000) {
                                    console.log(error);
                                } else {
                                   console.log("article saved");

                                }
                            });
                        }
                       return res.status(200).json(articleJson);

               }).catch((err) => {
                   console.log(err);
                   return res.status(401).json(err);
               });
               // content = content.replace('/\n/g','');
               // content = content.replace('/\r/g','');
               // console.log(content);

           }).catch((err) => {
                console.log(err);
                return res.status(401).json(err);
        });

    }

}
