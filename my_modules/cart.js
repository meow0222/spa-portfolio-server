const fs = require('fs');

async function addToCart(username, productID, quantity){
    return new Promise((resolve, reject) => {
        const fileData = fs.readFileSync('../data.users.json');
        let users;

        try {
            users = JSON.parse(fileData);
        } catch (error) {
            users = {};
            reject(error);
        }

        if (users[username]) {
            users[username].cart.splice(productID, 0, quantity)

            fs.writeFileSync(filePath, JSON.stringify(users));
            console.log(`User ${username} was added to users.json`);
        } else {
            console.log(`Username ${username} already exists!`);
        }

    })
}