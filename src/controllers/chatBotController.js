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

// Sends response messages via the Send API
function callSendAPI(sender_psid, response, quick_reply={"text": ""}) {
    // Construct the message body
    let request_body;

    if(!quick_reply.text){
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
            "message": quick_reply
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

let user_first_name = "";
let user_birth_date = "";
let latest_message = "";

function handleMessage(sender_psid, message) {
    // check kind of message
    try {
        if (message.quick_reply) {
            handleQuickReply(sender_psid, message);
        } else if (message.attachments) {
                handleAttachmentMessage();
        } else if (message.text) {
                handleTextMessage(sender_psid, message);
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

    latest_message = mess;

    // message.nlp did not work
    let greeting = ["hi", "hey", "hello"];
    let accept_conv = ["yup", "yes", "yeah"];
    let deny_conv = ["no", "nah", "nope", "not now", "maybe later"];

    let resp;

    if(mess === "#start_over"){
        user_first_name = "";
        user_birth_date = "";
    }

    if(greeting.includes(mess) || mess === "#start_over"){
        if(!user_first_name){
            resp = {
                "text": "Hello! Would you like to answer few questions?",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title":"Sure",
                    "payload": "sure"
                  },{
                    "content_type":"text",
                    "title":"Not now",
                    "payload": "not now"
                  }
                ]
              }
            callSendAPI(sender_psid,``, resp);
        } else{
            callSendAPI(sender_psid,`The bot needs more training. You said "${message.text}". Try to say "Hi".`);
        }

    }
    else if(accept_conv.includes(mess)){

    }
    else if (deny_conv.includes(mess)){
        callSendAPI(sender_psid,`Thank you for your answer. If you wish to start this conversation again write "#start_over". Goodbye 🖐`);
    }
    else {
        let resp;

        if(!user_first_name){
            resp = {
                "text": "Is " + latest_message + " your first name?",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title": "Yes",
                    "payload": "yes"
                  },{
                    "content_type":"text",
                    "title":"No",
                    "payload": "no"
                  }
                ]
            };

            callSendAPI(sender_psid,``, resp);
        } else if (!user_birth_date){
            resp = {
                "text": "Is " + latest_message + " your birth date?",
                "quick_replies":[
                  {
                    "content_type":"text",
                    "title": "Yep",
                    "payload": "yep"
                  },{
                    "content_type":"text",
                    "title":"Not at all",
                    "payload": "not at all"
                  }
                ]
            };

            callSendAPI(sender_psid,``, resp);
        }
        else {
            callSendAPI(sender_psid,`Thank you for your answer. If you wish to start this conversation again write "#start_over". Goodbye 🖐`);
        }
    }
}

function handleQuickReply(sender_psid, message){
    let mess = message.text;
    mess = mess.toLowerCase();

    // user agreed to answer questions
    if(mess === "sure"){
        if(!user_first_name){
            callSendAPI(sender_psid,`First, please write below your first name`);
        }
        else {
            callSendAPI(sender_psid,`The bot needs more training. You said "${message.text}". Try to say "Hi".`);
        }
    }
    // user agreed on his first name
    else if (mess === "yes") {
        latest_message[3] = latest_message[3].toUpperCase();
        for(let i = 3; i < latest_message.length; i++){
            user_first_name += latest_message[i];

            if(latest_message[i] === " ") break;
        }
        user_first_name = user_first_name.toUpperCase();
        console.log(user_first_name);

        callSendAPI(sender_psid,`You agreed that your first name is ${user_first_name}. Secondly, we would like to know your birth date. Write it down below in the format YYYY-MM-DD. Example: 1987-03-25`);
    }
    // user agreed on his birth date
    else if (mess === "yep"){
        latest_message[3] = latest_message[3].toUpperCase();
        for(let i = 3; i < latest_message.length; i++){
            user_birth_date += latest_message[i];

            if(latest_message[i] === " ") break;
        }
        user_birth_date = user_birth_date.toUpperCase();
        console.log(user_birth_date);

        let resp = {
            "text": `You agreed that your birth date is ${user_birth_date}. Would you like to know how many days are until your next birtday?`,
            "quick_replies":[
              {
                "content_type":"text",
                "title": "I do",
                "payload": "i do"
              },{
                "content_type":"text",
                "title":"Not interested",
                "payload": "not interested"
              }
            ]
        };

        callSendAPI(sender_psid,``, resp);
    }
    else if (mess === "i do"){
        callSendAPI(sender_psid,`There are n days until your next birthday. Would you like a present?`);
    }
    else if (mess === "not now" || mess === "no" || mess === "not at all" || mess === "not interested"){
            callSendAPI(sender_psid,`Thank you for your answer. If you wish to start this conversation again write "#start_over". Goodbye 🖐`);
    }
    else {
        callSendAPI(sender_psid,`The bot needs more training. You said "${message.text}". Try to say "Hi".`);
    }
}

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook
};