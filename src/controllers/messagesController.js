const Message = require("../models/Message");
const middleWare = require('middleWare');
const MongoClient = require('mongodb').MongoClient;

// variabie to cache messages
let MESS_S;

// function to get all messages
function getAllMess(){
	
	MongoClient.connect(
        process.env.DB_CONNECTION, {
            auth: {
                user: process.env.MONGO_DB_USER,
                password: process.env.MONGO_DB_PASSWORD
            }
        },
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true}, 
            function(err, client) {

        if (err) throw err;
        
        console.log("Connected correctly to server for getting messages");

        // Get database name
        var db = client.db('MessengerBot')
        
        db.collection("messages").find({}).toArray(function(err, res) {
            if (err) {
                throw err;
            }

			client.close();
            console.log("Displaying all messages");
			console.log(res);

			MESS_S = res;
        });
	});
}

// render messages
let getMessages = (req, res) => {
	// waiting for messages
	if (MESS_S){
		res.render("ejs/messages.ejs", {messages: JSON.stringify(MESS_S)});
	}
	else{
		getAllMess();
		
		MESS_S = JSON.stringify(MESS_S);

		setTimeout(() => {
			console.log(MESS_S[0]);
			console.log(MESS_S[0].text);
			console.log(MESS_S[0]._id);

			res.render("ejs/messages.ejs", {messages: JSON.stringify(MESS_S)});
		}, 3000);
	}
};

// function to get a message with given id
function getMessageWithGivenId(mess_given_id){
	for(let x of MESS_S){
		let first = JSON.stringify(x._id);
		let second = JSON.stringify(mess_given_id);

		for(var i = 0; i < first.length; i++){
			if(first[i] !== second[i])
				break;
		}

		if (i === first.length){
			return x.text;
		}
	}
}

// render a single message
let getMessageId = async (req, res) => {
	// try {
	// 	let mess = await Message.findById(req.params.messId);
	// 	res.render("ejs/messages.ejs", {messages: mess});
	// } catch (err) {
	// 	res.json({message: err});
	// }
	
	let msg = "";
	
	function sendMess(){
		msg = getMessageWithGivenId(req.params.messId);
		if (msg !== ""){
			res.render("ejs/messages.ejs", {messages: msg});
		}
		else{
			res.render("ejs/messages.ejs", {messages: "Message does not exist"});
		}
	}

	if (MESS_S){
		sendMess();
	}
	else{
		getAllMess();
		
		setTimeout(() => {
			sendMess();
		}, 3000);
	}
};

// delete a single message
let deleteMessageById = async (req, res) => {
	// try {
	// 	const removed_message = await Message.remove({_id: req.params.messId});
	// 	res.json(removed_message);
	// } catch (error) {
	// 	res.json({message: error});
	// }

	let msg = "";
	
	function deleteMess(){
		msg = getMessageWithGivenId(req.params.messId);

		if (msg !== ""){
			MongoClient.connect(
				process.env.DB_CONNECTION, {
					auth: {
						user: process.env.MONGO_DB_USER,
						password: process.env.MONGO_DB_PASSWORD
					}
				},
				{
					useNewUrlParser: true, 
					useUnifiedTopology: true}, 
					function(err, client) {
		
				if (err) throw err;
				
				console.log("Connected correctly to server for deleting the message");
		
				// Get database name
				var db = client.db('MessengerBot')
				var my_query = {_id: req.params.messId};

				db.collection("messages").deleteOne(my_query, function(err, res) {
					if (err) {
						throw err;
					}
		
					client.close();
					console.log("Deleted 1 message");

				});
			});
			
			res.render("ejs/messages.ejs", {messages: "Message deleted"});
		}
		else{
			res.render("ejs/messages.ejs", {messages: "Message does not exist"});
		}
	}

	if (MESS_S){
		deleteMess();
	}
	else{
		getAllMess();
		
		setTimeout(() => {
			deleteMess();
		}, 3000);
	}
};

module.exports = {
	getMessages: getMessages,
	getMessageId: getMessageId,
	deleteMessageById: deleteMessageById
};
