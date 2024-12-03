let selectedRestaurant = null;
let orderItems = [];

// Restaurant menus
const menus = {
    pizzaPlace: [
        { id: 1, name: 'Margherita Pizza', price: 10 },
        { id: 2, name: 'Pepperoni Pizza', price: 12 },
        { id: 3, name: 'Veggie Pizza', price: 9 }
    ],
    burgerJoint: [
        { id: 1, name: 'Cheeseburger', price: 7 },
        { id: 2, name: 'Veggie Burger', price: 6 },
        { id: 3, name: 'Bacon Burger', price: 8 }
    ],
    sushiSpot: [
        { id: 1, name: 'California Roll', price: 15 },
        { id: 2, name: 'Tuna Sashimi', price: 18 },
        { id: 3, name: 'Salmon Roll', price: 17 }
    ]
};

// Show menu for selected restaurant
function showMenu(restaurant) {
    selectedRestaurant = restaurant;
    document.getElementById('restaurants').style.display = 'none';
    document.getElementById('menu').style.display = 'block';

    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';

    menus[restaurant].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="addToOrder(${item.id}, '${item.name}', ${item.price})">Add to Order</button>
        `;
        menuList.appendChild(menuItem);
    });
}

// Add item to order
function addToOrder(id, name, price) {
    orderItems.push({ id, name, price });
    displayOrderSummary();
}

// Display order summary
function displayOrderSummary() {
    const orderSummary = document.getElementById('order-items');
    orderSummary.innerHTML = '';

    let total = 0;
    orderItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.innerHTML = `${item.name} - $${item.price}`;
        orderSummary.appendChild(orderItem);
        total += item.price;
    });

    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<strong>Total: $${total}</strong>`;
    orderSummary.appendChild(totalElement);

    document.getElementById('order-summary').style.display = 'block';
}

// Go back to restaurant selection
function backToRestaurants() {
    document.getElementById('restaurants').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('order-summary').style.display = 'none';
    orderItems = [];
}

// Place order
function placeOrder() {
    alert('Your order has been placed successfully!');
    backToRestaurants();
}

// Cancel order
function cancelOrder() {
    orderItems = [];
    displayOrderSummary();
    document.getElementById('order-summary').style.display = 'none';
}
