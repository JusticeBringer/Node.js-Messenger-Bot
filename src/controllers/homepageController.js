let getHomepage = (req, res) => {
    return res.render("ejs/homepage.ejs");
};

let getMessages = (req, res) => {
    let all_messages = {};
    return res.render("ejs/messages.ejs", {messages: all_messages});
};

let getMessageId = (req, res) => {
    let all_messages = {};
    return res.send(all_messages);
}

let getHeadLinks = (req, res) => {
    return res.render("partials/headLinks.ejs");
};

module.exports = {
    getHomepage: getHomepage,
    getMessages: getMessages,
    getHeadLinks: getHeadLinks
};
