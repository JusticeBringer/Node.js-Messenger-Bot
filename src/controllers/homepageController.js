import { readFileSync } from 'fs';

let getHomepage = (req, res) => {
    return res.render("ejs/homepage.ejs");
};

let getMessages = (req, res) => {
    let all_messages = readFileSync("messages.json");
    return res.render("ejs/messages.ejs", {messages: all_messages});
};

let getHeadLinks = (req, res) => {
    return res.render("partials/headLinks.ejs");
};

export const getHomepage = getHomepage;
export const getMessages = getMessages;
export const getHeadLinks = getHeadLinks;
