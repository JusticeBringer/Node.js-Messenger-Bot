let fs = require('fs');

let getHomepage = (req, res) => {
    return res.render("ejs/homepage.ejs");
};

let getMessages = (req, res) => {
    let all_messages;
    
    fs.readFile('messages.txt', (err, data) => { 
        if (err) throw err; 
      
        all_messages = data;
        return res.render(data);
        console.log(data);
    });

    return res.render("ejs/messages.ejs", {messages: all_messages});
};

let getHeadLinks = (req, res) => {
    return res.render("partials/headLinks.ejs");
};

module.exports = {
    getHomepage: getHomepage,
    getMessages: getMessages,
    getHeadLinks: getHeadLinks
};
