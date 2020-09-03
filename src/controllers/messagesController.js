import { readFileSync } from 'fs';

// storing messages
let MESS_S = {"id": 0, "text": "text"};

// caching messages for 1 minute
setInterval(() => {
	MESS_S = readFileSync("messages.json");
	MESS_S = JSON.stringify(MESS_S);
}, 2000);

let getMessages = (req, res) => {
    return res.render("ejs/messages.ejs", {messages: JSON.stringify(MESS_S)});
};

// render a single message
let getMessageId = (req, res) => {
	let mess_id = req.params.messId;
	console.log(mess_id);

	for (let x in MESS_S){
		console.log(x);
	}
	return res.render("ejs/messages.ejs", {messages: "MESS_S"});
};

// delete a single message
let deleteMessageById =  (req, res) => {
	let msg = "";
	
	
	res.render("ejs/messages.ejs", {messages: "Message deleted"});

	res.render("ejs/messages.ejs", {messages: "Message does not exist"});
	
};

module.exports = {
	getMessages: getMessages,
	getMessageId: getMessageId,
	deleteMessageById: deleteMessageById
};