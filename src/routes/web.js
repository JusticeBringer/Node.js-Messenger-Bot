import express from "express";
import homepageController from "../controllers/homepageController";
import chatBotController from "../controllers/chatBotController";
import messagesController from "../controllers/messagesController"
import headLinksController from "../controllers/headLinksController"

let router = express.Router();

let initWebRoutes = (app)=> {
    router.get("/", homepageController.getHomepage);
    router.get("/messages", messagesController.getMessages);
    
    router.get("/messages/:messId", messagesController.getMessageId);
    router.delete("/messages/:messId", messagesController.deleteMessageById);

    router.get("/headLinks", headLinksController.getHeadLinks);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);

    return app.use("/", router);
};

module.exports = initWebRoutes;