document.addEventListener("DOMContentLoaded", function() {
    // Sample food items data
    const foodItems = [
        {
            id: 1,
            name: "Pizza Margherita",
            price: "10",
            image: "images/pizza.jpg",
            description: "Classic pizza with tomato sauce and mozzarella cheese."
        },
        {
            id: 2,
            name: "Cheeseburger",
            price: "8",
            image: "images/cheeseburger.jpg",
            description: "Juicy beef burger with cheddar cheese, lettuce, and tomato."
        },
        {
            id: 3,
            name: "Sushi Platter",
            price: "15",
            image: "images/sushi.jpg",
            description: "Assorted sushi rolls with fresh fish and vegetables."
        }
    ];

    const foodItemsContainer = document.getElementById("food-items");

    function displayFoodItems(items) {
        foodItemsContainer.innerHTML = "";
        items.forEach(item => {
            const foodItemCard = `
                <div class="col-md-4">
                    <div class="card food-item-card">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text"><strong>$${item.price}</strong></p>
                            <button class="btn btn-primary add-to-cart" data-name="${item.name}" data-id="${item.id}" data-price="${item.price}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            foodItemsContainer.innerHTML = foodItemsContainer.innerHTML + foodItemCard;
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const item = {
                    id: this.getAttribute('data-id'),
                    name: this.getAttribute('data-name'),
                    price: parseFloat(this.getAttribute('data-price'))
                };
                addToCart(item);
            });
        });
    }

    const cartCount = document.getElementById('cart-count');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    function addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert("Item " + item.name + " added to cart!");
    }


    function filterFoodItems(query) {
        return foodItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }

    document.getElementById("search-button").addEventListener("click", function() {
        const query = document.getElementById("search-bar").value;
        const filteredItems = filterFoodItems(query);
        displayFoodItems(filteredItems);
    });

    displayFoodItems(foodItems);
    updateCartCount();


});
