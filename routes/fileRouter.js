const fileController = require("../controllers/fileController");

const { Router } = require("express");

const fileRouter = Router();

fileRouter.get("/path/*", fileController.renderFile);

module.exports = fileRouter;