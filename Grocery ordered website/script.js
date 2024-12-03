// List of available groceries
const groceriesData = {
    "Supermart 1": [
        { name: "Apples", price: 2.5 },
        { name: "Bananas", price: 1.8 },
        { name: "Carrots", price: 1.2 },
        { name: "Tomatoes", price: 3.0 }
    ],
    "Supermart 2": [
        { name: "Potatoes", price: 1.5 },
        { name: "Onions", price: 2.0 },
        { name: "Lettuce", price: 2.3 },
        { name: "Cucumbers", price: 1.7 }
    ]
};

// Array to hold items added to the cart
let cart = [];

// Function to load groceries based on selected supermarket
function loadGroceries(supermarket) {
    const groceryList = groceriesData[supermarket];
    let groceriesHTML = '';

    groceryList.forEach(item => {
        groceriesHTML += `
            <div class="grocery-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            </div>
        `;
    });

    document.getElementById('groceries').innerHTML = groceriesHTML;
}

// Function to add items to the cart
function addToCart(name, price) {
    const item = { name, price };
    cart.push(item);
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(li);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to generate the bill
function generateBill() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let billDetails = '';
    cart.forEach(item => {
        billDetails += `<p>${item.name}: $${item.price}</p>`;
    });

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    billDetails += `<h3>Total: $${totalAmount.toFixed(2)}</h3>`;

    const billWindow = window.open("", "Bill", "width=400,height=300");
    billWindow.document.write(`<h2>Bill Details</h2>${billDetails}`);
}
