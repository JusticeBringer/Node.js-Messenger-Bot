const Message = require("../models/Message");

// render messages
let getMessages = async (req, res) => {
    let MongoClient = require('mongodb').MongoClient;
    let all_messages;

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
            
            all_messages = res;
            console.log("Displaying all messages")
            console.log(res);
            
            client.close();
        });
    });

    // waiting for messages
    setTimeout(() => {
        res.render("ejs/messages.ejs", {messages: JSON.stringify(all_messages)});
    }, 3000);
};

// render a single message
let getMessageId = async (req, res) => {
	// try {
	// 	let mess = await Message.findById(req.params.messId);
	// 	res.render("ejs/messages.ejs", {messages: mess});
	// } catch (err) {
	// 	res.json({message: err});
	// }

	setTimeout(() => {
		let mess = Message.findById(req.params.messId);
		mess = JSON.parse(mess);
		console.log(mess);

		res.render("ejs/messages.ejs", {messages: mess});
	}, 2000);
}

// delete a single message
let deleteMessageById = async (req, res) => {
	// try {
	// 	const removed_message = await Message.remove({_id: req.params.messId});
	// 	res.json(removed_message);
	// } catch (error) {
	// 	res.json({message: error});
	// }

	setTimeout(() => {
		const removed_message = Message.remove({_id: req.params.messId});
		res.json(removed_message);
	}, 2000);
};

module.exports = {
	getMessages: getMessages,
	getMessageId: getMessageId,
	deleteMessageById: deleteMessageById
};
