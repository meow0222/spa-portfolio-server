const fs = require('fs');

async function addToCart(username, id, quantity, filePath){
    return new Promise((resolve, reject) => {

        let users;

        try {
            const fileData = fs.readFileSync(filePath);
            users = JSON.parse(fileData);
        } catch (error) {
            users = {};
            reject(error);
        }

        if (users[username]) {
            users[username].cart.splice(id, 0, quantity)

            fs.writeFileSync(filePath, JSON.stringify(users));
            console.log(`${quantity} counts of the product ${id} were added to ${username}'s cart.`);
        } else {
            return(`Username ${username} doesn't exist!`);
        }
        resolve();
    });
}

async function removeFromCart(username, id, filePath){
    return new Promise((resolve, reject) => {

        let users;

        try {
            const fileData = fs.readFileSync(filePath);
            users = JSON.parse(fileData);
        } catch (error) {
            users = {};
            reject(error);
        }

        if (users[username]) {
            users[username].cart.splice(id, 0, null)

            fs.writeFileSync(filePath, JSON.stringify(users));
            console.log(`${id} was removed from ${username}'s cart.`);
        } else {
            return(`Username ${username} doesn't exist!`);
        }
        resolve();
    });
}

module.exports = {
    addToCart,
    removeFromCart
}