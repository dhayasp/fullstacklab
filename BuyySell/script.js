// Global variables to store ads, buyer products, and seller products
let ads = [];
let sellerProducts = [];
let buyerProducts = [];

// Function to handle posting an ad
document.getElementById('ad-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const newAd = {
        id: ads.length + 1,
        title,
        description,
        price
    };

    ads.push(newAd);
    sellerProducts.push(newAd); // Add to seller's list by default
    displaySellerProducts();
    document.getElementById('ad-form').reset();
});

// Function to display seller's products
function displaySellerProducts() {
    const sellerProductsList = document.getElementById('seller-products-list');
    sellerProductsList.innerHTML = '';

    sellerProducts.forEach(ad => {
        const adCard = document.createElement('div');
        adCard.classList.add('ad-card');
        adCard.innerHTML = `
            <h3>${ad.title}</h3>
            <p>${ad.description}</p>
            <p>Price: $${ad.price}</p>
            <button onclick="buyProduct(${ad.id})">Buy</button>
        `;
        sellerProductsList.appendChild(adCard);
    });
}

// Function to display buyer's products
function displayBuyerProducts() {
    const buyerProductsList = document.getElementById('buyer-products-list');
    buyerProductsList.innerHTML = '';

    buyerProducts.forEach(ad => {
        const adCard = document.createElement('div');
        adCard.classList.add('ad-card');
        adCard.innerHTML = `
            <h3>${ad.title}</h3>
            <p>${ad.description}</p>
            <p>Price: $${ad.price}</p>
        `;
        buyerProductsList.appendChild(adCard);
    });
}

// Function to handle buying a product
function buyProduct(adId) {
    const ad = sellerProducts.find(ad => ad.id === adId);

    // Remove from seller products
    sellerProducts = sellerProducts.filter(ad => ad.id !== adId);

    // Add to buyer products
    buyerProducts.push(ad);

    // Re-display the lists
    displaySellerProducts();
    displayBuyerProducts();

    alert(`You have successfully bought the product: ${ad.title}`);
}

// Function to handle searching ads from both seller and buyer products
function searchAds() {
    const query = document.getElementById('search-bar').value.toLowerCase();

    // Filter out products that are already bought and products that are already displayed
    const results = ads
        .concat(sellerProducts) // Include seller products
        .concat(buyerProducts)  // Include buyer products
        .filter(ad => ad.title.toLowerCase().includes(query));

    displaySearchResults(results);
}

// Function to display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    // Avoid displaying products that are already in the seller or buyer lists
    const uniqueResults = results.filter((ad, index, self) =>
        index === self.findIndex((t) => (
            t.id === ad.id
        ))
    );

    if (uniqueResults.length > 0) {
        uniqueResults.forEach(ad => {
            const adCard = document.createElement('div');
            adCard.classList.add('ad-card');
            adCard.innerHTML = `
                <h3>${ad.title}</h3>
                <p>${ad.description}</p>
                <p>Price: $${ad.price}</p>
                <button onclick="buyProduct(${ad.id})">Buy</button>
            `;
            searchResults.appendChild(adCard);
        });
    } else {
        searchResults.innerHTML = '<p>No ads found</p>';
    }
}
