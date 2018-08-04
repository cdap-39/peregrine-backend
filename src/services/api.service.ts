import UserCtrl from "../controllers/UserCtrl";

export default class  ApiService {

    public request = require("request");
    public pathToMl = "http://localhost:8000";
    public pathToES = "http://35.237.151.220:9200/hirunews/_search";
    private static instance: ApiService = null;

    public static getInstance(): ApiService {
    if (ApiService.instance === null) {
       ApiService.instance = new ApiService();
    }
    return ApiService.instance;
   }
    public getArticles(searchKey: string) {
         const query = {
                query: {
                    bool: {
                        should: [
                            {match: {content: searchKey} },
                        ],
                    },
                },
                _source: ["content"],
                size: 5,
         };
         return new Promise((resolve, reject) => {

            console.log(query);
            this.request.post(
                this.pathToES,
                {json : query},
                function(error: any, response: any, body: {}) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        resolve(body);
                    } else {
                        reject(error);
                        // response.status(401).json("cannot catch articles: "+error);
                    }
                },
            );
       //        { "match": { "content": "cricket " } },
       // { "match": { "content": "Dinesh Chandimal" } },
       // { "match": { "content": "spinner" } },
       // { "match": { "content": "Rangana Herath" } },
       // { "match": { "content": "kumara sangakkara" } },
       // { "match": { "content": "icc cricket" } }
       //      this.request({
       //          url: this.pathToES,
       //          method: "POST",
       //          json: true,   // <--Very important!!!
       //          body: query
       //             }, function (error:any, response:any, body:any){
       //               if (!error && response.statusCode == 200) {
       //                  console.log(body);
       //                  resolve(body);
       //              } else {
       //                  reject(error);
       //              }
       //          });
        });

    }

        public getArticlesCategory(artcle: any) {

            const query = {
                data: artcle,
            };
            console.log(JSON.stringify(query));
            return new Promise((resolve, reject) => {
                this.request.post(
                    this.pathToMl,
                    {json: query},
                    function(error: any, response: any, body: any) {
                        if (!error && response.statusCode === 200) {
                            console.log(body);
                            resolve(body);
                        } else {
                            reject(error);
                        }
                    },
                );
            });
        }
}
