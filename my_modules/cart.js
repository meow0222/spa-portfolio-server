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
            users[username].cart.splice(id, 1, quantity)
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
            users[username].cart.splice(id, 1, null)

            fs.writeFileSync(filePath, JSON.stringify(users));
            console.log(`${id} was removed from ${username}'s cart.`);
        } else {
            return(`Username ${username} doesn't exist!`);
        }
        resolve();
    });
}

function loadCart(username){
    let users = JSON.parse(fs.readFileSync('./data/users.json'));
    let products = JSON.parse(fs.readFileSync('./data/products.json'));
    let cart = users[username].cart;
    let resCart = [];
    console.log(cart.length);
    try{
        for(let i = 0; i < (cart.length); i++) {
            if(cart[i] != null) {
                resCart.push(`<li id="cartLi"><b>Name: ${products.products[i].name}  </b><b>Price: ${products.products[i].price}  </b><b>Quantity: ${cart[i]}  </b></li>`);
            }
        }    
    } catch(error) {
        console.log(error);
    }
    resCart = JSON.stringify(resCart);
    return(resCart);
}   

module.exports = {
    addToCart,
    removeFromCart,
    loadCart
}