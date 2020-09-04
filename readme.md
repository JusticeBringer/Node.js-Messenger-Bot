# Node.js Messenger Bot
A Messenger Bot in Node.js

### Task

The goal is to create a Messenger bot in Node.js. The app should:

1. Be able to set up a Messenger webhook
2. When a user starts a conversation, say Hi and ask few questions:
   1. User's first name
   2. Birth date
   3. If the user wants to know how many days till his next birtday. This is a yes/no answer and the bot should accept both user text answer („yes", „yeah", „yup”, "no”, "nah", etc.) and quick reply buttons. To make it simpler, you can assume there's only one valid date format: YYYY-MM-DD
3. If user says yes to the last question, send him a message: There are N days left until your next birthday
4. If user says no, just say: Goodbye 
5. Within the same app, create a REST endpoint /messages that lists all messages received from users
6. Create a REST endpoint for viewing a single message by its ID and also for deleting a single message.

Don't worry about the persistence layer. Feel free to keep all messages in the runtime memory, although using a database of your choice is a big plus.

### What we look at

For this task, we look for (in that order) quality, tested code, good git manners, business thinking (if you have an idea - feel free to add something extra to the app!), workflow, communication and/or independence.

## Solution

A very friendly Messenger Bot who wants to know better a person. Start the conversation by typing a greeting message like "Hi".

### Message category

- Greeting: "hi", "hey", "hello"
- Accepting: "yup", "yes", "yeah", "sure", "yep", "i do"
- Denying: "no", "nah", "nope", "not now", "maybe later"
- Gratitude: "thanks", "thx", "thank you", "thank you very much", "thanks a lot", "thanks!", "thank you!"
- Other

### Maintaining conversation

Bot is still very early on his learning phase, so you should try to correctly answer the questions and choosing answers from given cards, although you can manually type messages.

### Demo conversation

Here is a complete conversation with good input from user.

![Demo conversation](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/demo.gif)

### Technical details

This repository has 3 branches:

1. Master
2. noDB
3. withMongoDB

Branch 2 accomplishes all the requirements, but saves messages on the runtime in a .json file and this version of the branch is not hosted on the web. 
Branch 3 accomplishes all the requirements and saves messages in cloud, in a MongoDB database and this version of the branch is hosted on the web [here](https://bot-messenger-node-js.herokuapp.com). 
Branch 1 is the same as branch 3.

**Observation**: Async/await made infinite loading pages so I made a workaround using setTimeout instead. Needs further investigation.

### Branch 2 back-end demo
[![Watch the video](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/videoOne.png)](https://www.youtube.com/watch?v=0Jv8TrkaiVA&feature=youtu.be)

### Branch 3 back-end demo
[![Watch the video](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/videoTwo.png)](https://www.youtube.com/watch?v=07d_gAP6bd0&feature=youtu.be)

### Technologies used

- HTML, CSS, Javascript, Node.js

### How to use this project

1. Clone this project
2. Rename .env.example file to .env file and fill the required variables
3. Run ```npm start``` for starting project

For step 2 I would recommend watching [this](https://www.youtube.com/watch?v=Gv-FWOTY4TM&t=2511s)

### Inspiration and help

1. https://github.com/haryphamdev/facebook-messenger-chat-bot-nodejs
