// admin.js

document.addEventListener('DOMContentLoaded', function() {
    // Include the sidebar
    const sidebarContainer = document.getElementById('sidebar-container');
    fetch('admin-sidebar.html')
        .then(response => response.text())
        .then(data => {
            sidebarContainer.innerHTML = data;
        });

    // Load products from local storage and display them
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productRow = document.createElement('div');
        productRow.classList.add('product-row', 'row', 'border-bottom', 'mb-4', 'pb-4');
        productRow.innerHTML = `
            <div class="product-image col-2"><img src="${product.image}" alt="${product.name}" class="img-fluid"></div>
            <div class="product-details col-3">
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p><strong>Description:</strong> ${product.description}</p>
            </div>
            <div class="product-actions col-7 text-right">
                <button class="btn btn-warning btn-sm mr-2">Edit</button>
                <button class="btn btn-primary btn-sm">Send Promotion</button>
            </div>
            `
productList.appendChild(productRow);
});

// Toggle sidebar
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('wrapper').classList.toggle('toggled');
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    alert(cart.length);
    document.getElementById('cart-count').textContent = cart.length;
}

updateCartCount();

});
