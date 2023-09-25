const express = require('express'); // express module to create a server application
const cors = require('cors'); // cors module to handle Preflight requests
const bodyParser = require('body-parser'); // body-parser module to parse JSON objects
const fs = require('fs'); // fs library to read and write files

const app = express(); // instance of an Express object
const port = 3000; // the port the server will be listening on
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8'});

// import our custom modules here:
const { authenticateUser } = require('./my_modules/login.js');
const {  addUser, updatePassword } = require('./my_modules/utility.js');

app.use(cors({
    origin: 'http://localhost:5000' 
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.options('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Headers', 'task'); // Allow the 'task 'header
    res.header('Access-Control-Allow-Methods', 'GET'); // Allow the GET method
    res.header('Access-Control-Allow-Methods', 'POST'); // Allow the POST method
    res.header('Access-Control-Allow-Methods', 'PUT'); // Allow the POST method
    res.sendStatus(200);
});

app.get('/login', textBodyParser, async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers); 
    
    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request
    const reqUserName = req.headers['username']

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask + reqUserName);

    // TASK Check
    if (reqTask === 'login') {
        try {
            const loginResult = await authenticateUser(req);
            console.log('authenticateUser() result: ', loginResult);
            if (loginResult == true) {
                res.setHeader('Access-Control-Expose-Headers', 'request-result, username'); // 'username' ヘッダーを公開するように設定

                res.setHeader('Access-Control-Allow-Origin', '*');
                // allow client to access the custom 'request-result' header:

                res.setHeader('Access-Control-Expose-Headers', 'request-result'); 
                // set the custom header 'request-result'
                res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');
                res.setHeader('username', username); // 'username' ヘッダーを実際のユーザー名で設定

                res.status(200).send("Login Successful");
            } else {
                res.status(403).send("Login Failed"); // 403 Forbidden Access
            }
        } catch (error) {
            console.log('authenticateUser() error:', error);
            res.status(500).send("Server Error");
        }
    }

    res.end();

    /* 
    // remade and moved to login.js
    const { username, password } = req.query;
    fs.readFile('/data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Server error");
            return;
        }

        const users = JSON.parse(data);
        if (users[username] && users[username].password === password) {
            res.send("Login successful");
        } else {
            res.send("Login failed");
        }
    });
    */
});



app.post('/login', async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request
    const reqBody = req.body; // get the request data

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
    console.log("req.body: ", req.body);
    console.log("req.body.username: ", req.body.username);
    console.log("req.body.password: ", req.body.password);

    // TASK Check
    if (reqTask === 'signup') {
        try {
            const filePath = './data/users.json';
            const username = reqBody.username;
            const password = reqBody.password;
            await addUser(filePath, username, password);

        } catch (error) {
            console.log('There was a problem responding with a rotation: ', error);
            res.status(500).send("Server Error");
        }
    }

});

app.put('/login', async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request
    const reqBody = req.body; // get the request data

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);
    console.log("req.body: ", req.body);
    console.log("req.body.username: ", req.body.username);
    console.log("req.body.newPassword: ", req.body.newPassword);

    // TASK Check
    if (reqTask === 'updateUser') {
        try {
            const filePath = './data/users.json';
            const username = reqBody.username;
            const newPassword = reqBody.newPassword;
            await updatePassword(filePath, username, newPassword);
            res.status(200).send(res)
        } catch (error) {
            res.status(500).send(res);
        }
    }

});

// Initialize the Server, and Listen to connection requests
app.listen(port, (err) => {
    if (err) {
        console.log("There was a problem: ", err);
        return;
    }
    console.log(`Server listening on http://localhost:${port}`);
})