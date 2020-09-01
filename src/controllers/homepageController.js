let getHomepage = (req, res) => {
    return res.render("ejs/homepage.ejs");
};

let getMessages = (req, res) => {
    return res.render("ejs/messages.ejs");
};

let getHeadLinks = (req, res) => {
    return res.render("partials/headLinks.ejs");
};

export const getHomepage = getHomepage;
export const getMessages = getMessages;
export const getHeadLinks = getHeadLinks;
