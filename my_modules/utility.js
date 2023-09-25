const { parse } = require("csv-parse"); // import csv-parse into a 'parse' object
const fs = require('fs'); // import fs module

async function addUser(filePath, username, password) {
    return new Promise((resolve, reject) => {
        const fileData = fs.readFileSync(filePath);
        let users;

        try {
            users = JSON.parse(fileData);
        } catch (error) {
            users = {};
            reject(error);
        }

        if (!users[username]) {
            users[username] = {
                password: password
            };

            fs.writeFileSync(filePath, JSON.stringify(users));
            console.log(`User ${username} was added to users.json`);
        } else {
            console.log(`Username ${username} already exists!`);
        }

        resolve();

    });

}async function updatePassword(filePath, username, newPassword) {
    return new Promise((resolve, reject) => {
        const fileData = fs.readFileSync(filePath);
        let users;

        try {
            users = JSON.parse(fileData);
        } catch (error) {
            users = {};
            reject(error);
        }

        if (users[username]) {
            users[username].password = newPassword;
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
            console.log(`${username}'s password was updated!`);
        } else {
            return(`Username ${username} doesn't exist!`);
        }

        resolve();

    });
}





module.exports = {
    addUser,
    updatePassword
};