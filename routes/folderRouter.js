const folderController = require('../controllers/folderController');

const { Router } = require("express");

const folderRouter = Router();

// Render form to create folder
folderRouter.get("/create/*", folderController.renderCreateFolder);

// Create folder
folderRouter.post("/create/*", folderController.createFolder);

// Render current folder contents
folderRouter.get("/path/*", folderController.renderFolder);

module.exports = folderRouter;