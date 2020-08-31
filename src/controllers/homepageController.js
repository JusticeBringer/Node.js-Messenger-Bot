let getHomepage = (req, res) => {
    return res.render("ejs/homepage.ejs");
};

let getMessages = (req, res) => {
    return res.render("ejs/messages.ejs");
};

let getHeadLinks = (req, res) => {
    return res.render("partials/headLinks.ejs");
};

module.exports = {
    getHomepage: getHomepage,
    getMessages: getMessages,
    getHeadLinks: getHeadLinks
};
