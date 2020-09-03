import { writeFileSync } from 'fs';
var fs = require('fs');
var path = require('path');
var readStream = fs.createReadStream(path.join(__dirname, '/') + 'messages.json', 'utf8');

function loadMessages(){
	let data = '';
	readStream.on('data', function(chunk) {
		data += chunk;
	}).on('end', function() {
		MESS_S = JSON.parse(data);
	});
}

// storing messages
let MESS_S = loadMessages();

// caching messages for 1 minute
setInterval(() => {
	MESS_S = loadMessages();
}, 1000 * 60);

// renders messages page
let getMessages = (req, res) => {
    res.render("ejs/messages.ejs", {messages: JSON.stringify(MESS_S)});
};

function lookMessage(mess_given_id){
	for (let x of MESS_S){
		// we will compare 2 id's
		
		// get their values
		let first = "" + x.id;
		let second = mess_given_id;

		// compare char to char 
		for(var i = 0; i < first.length; i++){
			if(first[i] !== second[i])
				break;
		}

		// if here -> we got the message
		if (i === first.length){
			return x.text;
		}
	}
	return "";
}

// render a single message
let getMessageId = (req, res) => {
	let val = lookMessage(req.params.messId);
	if (val !== ""){
		res.render("ejs/messages.ejs", {messages: val});
	}
	// if here -> message not found
	else{
		res.render("ejs/messages.ejs", {messages: "Message not found"});
	}
};

// delete a single message
let deleteMessageById =  (req, res) => {
	let new_mess_s = [];
	let mess_given_id = req.params.messId;

	let val = lookMessage(mess_given_id);
	if (val !== ""){
		for (let x of MESS_S){
			// we will compare 2 id's
			
			// get their values
			let first = "" + x.id;
			let second = mess_given_id;
	
			// compare char to char 
			for(var i = 0; i < first.length; i++){
				if(first[i] !== second[i])
					break;
			}
	
			// we add every message different from the one we delete
			if (i !== first.length){	
				let new_mess = {};
				new_mess.id = x.id;
				new_mess.text = x.text;

				new_mess_s.push(new_mess);
			}
		}

		// update values
		MESS_S = new_mess_s;
		// write the new file
		writeFileSync("/messages.json", MESS_S);

		res.render("ejs/messages.ejs", {messages: "Message deleted"});
	}
	else{
	res.render("ejs/messages.ejs", {messages: "Message does not exist"});
	}
};

module.exports = {
	getMessages: getMessages,
	getMessageId: getMessageId,
	deleteMessageById: deleteMessageById
};