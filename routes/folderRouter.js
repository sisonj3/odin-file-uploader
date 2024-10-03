const folderController = require('../controllers/folderController');

const { Router } = require("express");

const folderRouter = Router();

// Render form to create folder
folderRouter.get("/create/*", folderController.renderCreateFolder);

// Create folder
folderRouter.post("/create/*", folderController.createFolder);

// Render current folder contents
folderRouter.get("/path/*", folderController.renderFolder);

// Delete selected folder
folderRouter.get("/delete/*", folderController.deleteFolder);

// Render form to rename folder
folderRouter.get("/rename/*", folderController.renderRenameFolder);

// Rename selected folder
folderRouter.post("/rename/*", folderController.renameFolder);

module.exports = folderRouter;