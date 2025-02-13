import express from "express";
import { config } from "./config";
import * as path from "path";
import { Injection } from "./injection";
import route from "./routes";
import { Routes } from './constants';
import { IStorage } from "./stores";
import nunjucks from "nunjucks";
import { UrlRoute } from './utils';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup nunjucks
nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

// Set Nunjucks as the view engine
app.set("view engine", "njk");

app.use((req, res, next) => {
  res.locals.route = Routes;
  res.locals._route = (route: string, params: { [key: string]: string } = {}) => {
    return UrlRoute.make(route, params, UrlRoute.url(req));
  };
  next();
})

const container = new Injection(app);
const storage: IStorage = container.resolve("storage");

route(app);

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: 604800000,
    immutable: true,
  }),
);

//404 page
app.use((req, res) => {
  res.status(404);
  res.render("error/404");
});

// Start the express server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Gracefully shut down server and Storage connection when the app exits
process.on("SIGTERM", () => {
  console.log("Shutting down...");
  storage.close(); // Close Redis connection
  process.exit(0);
});
