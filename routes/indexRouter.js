const indexController = require("../controllers/indexController");

const { Router } = require("express");

const indexRouter = Router();

// Render views/home.ejs
indexRouter.get("/", indexController.renderHome);

module.exports = indexRouter;
