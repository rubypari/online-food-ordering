document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    
    function loadCart() {
        updateCartCount();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            itemElement.innerHTML = `
                <div class="d-flex">
                    <img src="${item.image}" class="img-thumbnail mr-3" alt="${item.name}" style="width: 100px;">
                    <div>
                        <h5 class="mb-1">${item.name}</h5>
                        <p class="mb-1">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        
        const removeButtons = cartItemsContainer.querySelectorAll('button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    }
    
    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
    
    checkoutButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to proceed to checkout?')) {
            // Perform checkout actions here, e.g., redirect to a payment page
            alert('Checkout successful!');
            localStorage.removeItem('cart');
            loadCart();
        }
    });
    loadCart();
});
