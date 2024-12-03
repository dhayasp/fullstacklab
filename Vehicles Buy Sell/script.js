// script.js

let vehicles = []; // Array for vehicles for sale
let buyingVehicles = []; // Array for buying vehicles

// Function to add a vehicle to the "for sale" list
function addVehicle() {
    const name = document.getElementById('vehicle-name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value).toFixed(2);
    const image = document.getElementById('image').value || 'https://via.placeholder.com/100';

    if (name && description && price) {
        vehicles.push({ name, description, price, image });
        displayVehicles();
        clearForm();
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to display vehicles in the "for sale" list
function displayVehicles() {
    const vehicleList = document.getElementById('vehicle-list');
    vehicleList.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.name}">
            <span><strong>${vehicle.name}</strong>: ${vehicle.description} - $${vehicle.price}</span>
            <button onclick="buyVehicle(${index})">Buy</button>
        `;
        vehicleList.appendChild(listItem);
    });
}

// Function to clear the form inputs
function clearForm() {
    document.getElementById('vehicle-name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
}

// Function to handle buying a vehicle
function buyVehicle(index) {
    buyingVehicles.push(vehicles[index]); // Add to buying list
    vehicles.splice(index, 1); // Remove from "for sale" list
    displayVehicles();
    displayBuyingVehicles();
}

// Function to display buying vehicles
function displayBuyingVehicles() {
    const buyingList = document.getElementById('buying-list');
    buyingList.innerHTML = '';

    buyingVehicles.forEach((vehicle) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.name}">
            <span><strong>${vehicle.name}</strong>: ${vehicle.description} - $${vehicle.price}</span>
        `;
        buyingList.appendChild(listItem);
    });
}
