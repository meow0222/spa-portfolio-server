const fs = require('fs');

async function addToCart(username, id, quantity){
    return new Promise((resolve, reject) => {
        const fileData = fs.readFileSync('../data/users.json');
        let users;

        console.log('checkpoint1');

        try {
            users = JSON.parse(fileData);
            console.log('checkpoint 2');
        } catch (error) {
            users = {};
            reject(error);
            console.log('checkpoint -2');
        }

        if (users[username]) {
            users[username].cart.splice(id, 0, quantity)

            fs.writeFileSync('../data/users.json', JSON.stringify(users));
            console.log(`${quantity} counts of the product ${id} were added to ${username}'s cart.`);
        } else {
            return(`Username ${username} doesn't exist!`);
        }
        resolve();
    })
}

module.exports = {
    addToCart
}