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

![Demo conversation](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/demo.gif)

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
[![Watch the video](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/videoOne.png)](https://www.youtube.com/watch?v=0Jv8TrkaiVA&feature=youtu.be)

### Branch 3 back-end demo
[![Watch the video](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/videoTwo.png)](https://www.youtube.com/watch?v=07d_gAP6bd0&feature=youtu.be)

### Storage of messages

All the messages received from users are stored in a MongoDB Atlas database. Each website visitor has an unique id when he starts a Messenger conversation, making the storage of messages structured in an easy way.

A view on the MongoDB database:
![ScreenshotMongo7](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo7.PNG)

A view on the "/messages" page:
![ScreenshotMongo8](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo8.PNG)

### How to use this project

1. Clone this project
2. Rename .env.example file to .env file and fill the required variables
3. Run ```npm start``` for starting project

For step 2 I would recommend watching [this](https://www.youtube.com/watch?v=Gv-FWOTY4TM&t=2511s)

### How to initialise MongoDB

In the .env file there are 3 variables:

1. DB_CONNECTION
2. DB_NAME
3. DB_COLLECTION
4. MONGO_DB_USER
5. MONGO_DB_PASSWORD

Filling these 5 variables depends upon the steps below.

Firstly, you have to sign up for an account [here](https://account.mongodb.com/account/register?n=%2Fv2%2F5f4fed9616fc651a9ef5d934&nextHash=%23clusters). Then, from the left panel select the option "Clusters", click the button "Create a New Cluster", which should be near the top right corner, and fill the required details.
After completing, the "Clusters" panel should look like this:

![ScreenshotMongo1](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo1.PNG)

After that, we need to create a collection inside a database. In the panel of newly created cluster it's a button named "Collections". Click on it. We then click on the button "+ Create Database" and fill the required details. In my case, "DATABASE NAME" is "MessengerBot" (same name as the cluster) and "COLLECTION NAME" is "messages". After that, it will look like this:

![ScreenshotMongo6](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo6.PNG)

The given database name is the "DB_NAME" variable from the .env file and given collection name is the "DB_COLLECTION" variable.

In order to connect to the database, you need to set up a user who has database access. From the left panel select "Database Access", then click the button "+ ADD NEW DATABASE USER" near the top right corner. I would suggest going with "Password" for "Authentication Method" and "Read and write to any database" for the "Database User Privileges". The username and password set for "Password Authentication" are the .env variables "MONGO_DB_USER" and "MONGO_DB_PASSWORD".

![ScreenshotMongo4](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo4.PNG)

Secondly, you have to connect your cluster to your application. Click the "Connect" button, which is inside your cluster panel, and click "Connect your application", like so:

![ScreenshotMongo2](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo2.PNG)

After that, you should see the connection string which is under "Add your connection string into your application code". You have to replace <password> with the password set for the database user and <dbname> with the name of the database that connections will use by default. In my case, "dbname" is "MessengerBot". 
The connection string that you have right now is the DB_CONNECTION from the .env file. Until here you have filled the 3 required variables, but there is one more thing to do.

![ScreenshotMongo3](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo3.PNG)

Final step: from the left panel select "Network Access". Then click the button "+ ADD IP ADDRESS" near the top right corner. Depending on the security you want you can choose to manually add all the IP addresses you will be connecting with to the DB or you can choose to connect from everywhere, regarding the used IP address.

Depending on the option you selected, the "Network Access" panel should look like this:

![ScreenshotMongo5](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/docPictures/mongo5.PNG)


### Testing the code

1. Testing the connection with the MongoDB, inserting a message was done [here](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/src/controllers/messagesController.test.js)
2. Testing the helper functions for the conversation with the Messenger Bot, such as extraction of user first name, birth date and other, was done [here](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/src/controllers/chatBotController.test.js)
3. Testing the rendering of "header" and "head links" was done [here](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/src/controllers/headerController.test.js) and [here](https://github.com/JusticeBringer/Node.js-Messenger-Bot/blob/master/src/controllers/headLinksController.test.js)

### Technologies used

- HTML, CSS, Javascript, Node.js

### Inspiration and help

1. https://github.com/haryphamdev/facebook-messenger-chat-bot-nodejs
