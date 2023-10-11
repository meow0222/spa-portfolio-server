const fs = require('fs');

async function addToCart(username, id, quantity){
    return new Promise((resolve, reject) => {
        console.group("addToCart Promise");
        console.log(`typeof(username): ` + typeof(username));  // STRING
        console.log(`typeof(id): ` + typeof(id)); //STRING
        console.log(`typeof(quantity): ` + typeof(quantity)); //STRING

        let users;

        try {
            const fileData = fs.readFileSync('../data/users.json', 'utf8');
            console.log(`typeof(fileData): ` + typeof(fileData));
            console.log(fileData);

            // users = JSON.parse(fileData);
            console.log('checkpoint 2');
        } catch (error) {
            users = {};
            reject(error);
            console.log('checkpoint -2');
        }

        if (users[username]) {
            users[username].cart.splice(id, 0, quantity)

            fs.writeFileSync('../data/users.json', JSON.stringify(users));
            return(`${quantity} counts of the product ${id} were added to ${username}'s cart.`);
        } else {
            return(`Username ${username} doesn't exist!`);
        }
        console.groupEnd("addToCart Promise");
        resolve();
    });
}

module.exports = {
    addToCart
}