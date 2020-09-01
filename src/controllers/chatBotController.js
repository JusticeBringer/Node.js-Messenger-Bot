require("dotenv").config();
import request from "request";

let postWebhook = (req, res) =>{
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

let getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response, quick_reply="no") {
    // Construct the message body
    let request_body;

    if(quick_reply === "no"){
        request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": { "text": response }
        };
    }
    else{
        request_body = {
            "recipient": {
                "id": sender_psid
            },
            "messaging_type": "RESPONSE",
            "message":{
              "text": "Hello! Would you like to answer few questions?",
              "quick_replies":[
                {
                  "content_type":"text",
                  "title":"Yes",
                  "payload": "yes"
                },{
                  "content_type":"text",
                  "title":"No",
                  "payload": "no"
                }
              ]
            }
        };
    }
    

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v7.0/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!');
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

function firstTrait(nlp, name) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

let user_first_name = "";
let user_birth_date = "";

function handleMessage(sender_psid, message) {
    // check greeting is here and is confident
    try {
        if (message.quick_reply) {
            handleQuickReply();
        } else if (message.attachments) {
                handleAttachmentMessage();
        } else if (message.text) {
                handleTextMessage(sender_psid, message);
        } else if (event.postback) {
                handlePostback();
        } else if (event.referral) {
                handleReferral();
        } else{
            callSendAPI(sender_psid,`The bot needs more training. You said "${message.text}". Try to say "Hi".`);
        }
    } 
    catch (error) {
        console.error(error);
        callSendAPI(sender_psid,`An error has occured: '${error}'. We have been notified and will fix the issue shortly!`);
      }
}

function handleTextMessage(sender_psid, message){
    let mess = message.text;
    mess = mess.toLowerCase();

    // message.nlp did not work
    let greeting = ["hi", "hello"];
    let accept_conv = ["yup", "yes", "yeah"];
    let deny_conv = ["no", "nah"];

    if(greeting.includes(mess)){
        callSendAPI(sender_psid,`Hello! Would you like to answer few questions?`, "yes");
    }
    else if(accept_conv.includes(mess)){

    }
    else if (deny_conv.includes(mess)){

    }
    else {
        callSendAPI(sender_psid,`The bot needs more training. You said "${message.text}". Try to say "Hi".`);
    }
}

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook
};