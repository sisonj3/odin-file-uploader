const uploadController = require("../controllers/uploadController");

const { Router } = require("express");

const uploadRouter = Router();

// Render views/fileUploadForm.ejs
uploadRouter.get("/", uploadController.renderUploadForm);

// Post to save file
uploadRouter.post("/", uploadController.uploadFile);

module.exports = uploadRouter;