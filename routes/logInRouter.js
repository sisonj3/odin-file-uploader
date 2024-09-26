const logInController = require('../controllers/logInController');

const { Router } = require("express");

const logInRouter = Router();

// Render log in page
logInRouter.get("/", logInController.renderLogIn);

// Validate login info
logInRouter.post("/", logInController.logInUser);

// Log out user
logInRouter.get("/log-out", logInController.logOutUser);

module.exports = logInRouter;