function scrollToProducts() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

// FIXED SEARCH FILTER
let searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("keyup", function() {
        let value = this.value.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let text = card.innerText.toLowerCase();

            if (text.includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product, price) {
    cart.push({ name: product, price: price });

    localStorage.setItem("cart", JSON.stringify(cart));

    let count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;

    alert(product + " added to cart 🛒");
}

// LOAD CART PAGE
function loadCart() {
    let container = document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove ❌</button>
        `;

        container.appendChild(div);
    });
    let total = 0;

cart.forEach(item => {
    total += item.price;
});

let totalDiv = document.createElement("div");

totalDiv.innerHTML = `
    <h2>Total: ₹${total}</h2>
    <button onclick="checkout()">Checkout ✅</button>
    <button onclick="clearCart()">Clear Cart 🗑</button>
`;

container.appendChild(totalDiv);

    let count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
}

// RUN AFTER PAGE LOAD
window.onload = loadCart;
function removeFromCart(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart(); // refresh UI
}
function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert("Order placed successfully 🚀");
    clearCart();
}