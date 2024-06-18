document.addEventListener('DOMContentLoaded', function() {
    const paymentMethodSelect = document.getElementById('payment-method');
    const cardDetails = document.getElementById('card-details');
    const upiDetails = document.getElementById('upi-details');
    const paymentForm = document.getElementById('payment-form');
    const orderSummary = document.getElementById('order-summary');
    

    function toggleRequiredFields() {
        const paymentMethod = paymentMethodSelect.value;

        if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
            cardDetails.style.display = 'block';
            upiDetails.style.display = 'none';
            setRequired(cardDetails, true);
            setRequired(upiDetails, false);
        } else if (paymentMethod === 'upi') {
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'block';
            setRequired(cardDetails, false);
            setRequired(upiDetails, true);
        }
    }

    function setRequired(parent, isRequired) {
        const inputs = parent.querySelectorAll('input');
        inputs.forEach(input => input.required = isRequired);
    }

    paymentMethodSelect.addEventListener('change', toggleRequiredFields);

   /* paymentMethodSelect.addEventListener('change', function() {
        if (this.value === 'credit-card' || this.value === 'debit-card') {
            cardDetails.style.display = 'block';
            upiDetails.style.display = 'none';
        } else if (this.value === 'upi') {
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'block';
        }
    });*/

    function loadOrderSummary() {
        updateCartCount();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        cart.forEach(item => total += item.price);
        orderSummary.textContent = `Total: $${total.toFixed(2)}`;
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    }
    
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const paymentMethod = paymentMethodSelect.value;
        let paymentData = {};

        if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
            paymentData = {
                method: paymentMethod,
                cardNumber: document.getElementById('card-number').value,
                cardExpiry: document.getElementById('card-expiry').value,
                cardCVC: document.getElementById('card-cvc').value
            };
        } else if (paymentMethod === 'upi') {
            paymentData = {
                method: paymentMethod,
                upiId: document.getElementById('upi-id').value
            };
        }
        
        console.log('Payment Data:', paymentData);
        // Simulate payment processing
        alert('Payment successful!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });

    loadOrderSummary();
    toggleRequiredFields();
});
