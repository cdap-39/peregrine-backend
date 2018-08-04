import * as express from "express";
import UserCtrl from "../controllers/UserCtrl";
import ArtclesCtrl from "../controllers/ArtclesCtrl";



export default function setRoutes(app: any) {

    const router = express.Router();

    const userCtrl = new UserCtrl();
    const articleCtrl = new ArtclesCtrl();

    app.use("/api", router);

    router.route("/login").post(userCtrl.login);
    router.route("/login").post(userCtrl.login);
    router.route("/articles").get(userCtrl.getAllArticles);
    router.route("/save").post(userCtrl.saveArticles);
    router.route("/getAllsavedArticles").get(userCtrl.getAllsavedArticles);
    router.route("/summarizeArticles").post(userCtrl.summarize);
    router.route("/deleteArticles/:id").delete(userCtrl.deleteArticles);
    router.route("/test").post(articleCtrl.predictCategory);

    }
