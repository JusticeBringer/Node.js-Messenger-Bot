// render homepage
let getHomepage = (req, res) => {
    return res.render("ejs/homepage.ejs");
};

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
            console.log("here")
            console.log(res);
            
            client.close();
        });
    });


    // waiting for messages
    setTimeout(() => {
        
    console.log(JSON.stringify(all_messages));
        res.render("ejs/messages.ejs", {messages: JSON.stringify(all_messages)});
    }, 3000);
};

let getHeadLinks = (req, res) => {
    return res.render("partials/headLinks.ejs");
};

module.exports = {
    getHomepage: getHomepage,
    getMessages: getMessages,
    getHeadLinks: getHeadLinks
};
