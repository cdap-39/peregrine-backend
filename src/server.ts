"use strict";
// #!/usr/bin/env node
import * as bodyParser from "body-parser";
import * as cor from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
// import * as morgan from 'morgan';
import * as path from "path";
// import * as Promise from 'bluebird';

import setRoutes from "./routes/routes";

const app = express();
app.set("port", (process.env.PORT || 5000));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use( bodyParser.json({limit: "50mb"}) );
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000,
}));
app.use(cor());

let mongodbURI;
if (process.env.NODE_ENV === "test") {
	// mongodbURI = Config.MONGODB_TEST_URI;
	// mongodbURI = "mongodb://test:test@ds251827.mlab.com:51827/tracified-admin-backend-test";
	mongodbURI = "mongodb://harsha:abcd1234@ds217131.mlab.com:17131/peregrine";
} else {
	mongodbURI = "mongodb://harsha:abcd1234@ds217131.mlab.com:17131/peregrine";
	// mongodbURI = "mongodb://test:test@ds251827.mlab.com:51827/tracified-admin-backend-test";
	// app.use(morgan("dev"));
}
require("mongoose").Promise = global.Promise;
const mongodb = mongoose.connect(mongodbURI, );

mongodb
	.then(() => {
		console.log("Connected to MongoDB on connected");

		setRoutes(app);

		// app.get('/*', function(req, res) {
		//     res.sendFile(path.join(__dirname, '../public/index.html'));
		// });

		if (!module.parent) {
			app.listen(app.get("port"), () => {
				console.log("Listening on port " + app.get("port"));
			});
		}

	})
	.catch((err: any) => {
		console.error(err);
	});

export { app };
