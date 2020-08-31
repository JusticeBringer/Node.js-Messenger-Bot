const express = require('express')
const app = express();

app.use(express.static(__dirname + '/views'));

// Setting view engine as ejs
app.set('view engine', 'ejs');

// Get messages
app.get('/messages', async (req, res) => {
    res.send("Messages");
});

// Defining port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`) ;
    console.log('Press Ctrl+C to quit.')
});