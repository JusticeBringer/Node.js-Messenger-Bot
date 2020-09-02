let fs = require('fs');

let getHomepage = (req, res) => {
    return res.render("ejs/homepage.ejs");
};

let getMessages = (req, res) => {
    let all_messages = [];

    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                all_messages = rawFile.responseText;
                return res.render("ejs/messages.ejs", {messages: all_messages});
            }
        }
    }
    rawFile.send(null);

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
