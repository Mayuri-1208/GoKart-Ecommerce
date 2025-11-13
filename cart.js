document.addEventListener("DOMContentLoaded", () => {
  displayCart();
});

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContent = document.getElementById("cartContent");
  let totalPrice = document.getElementById("totalPrice");

  cartContent.innerHTML = "";
  let totalBill = 0;

  if (cart.length === 0) {
    cartContent.innerHTML = `
      <p class="empty-message">
        Your cart is empty. <a href="./Home.html">Start Shopping</a>.
      </p>`;
    totalPrice.textContent = "";
    return;
  }

  cart.forEach((product, i) => {
    let convertedPrice = product.price * 80;
    let quantity = product.quantity || 1;
    let itemTotal = convertedPrice * quantity;
    totalBill += itemTotal;

    let productElem = document.createElement("div");
    productElem.classList.add("product-info");

    productElem.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="details">
        <h3>${product.title}</h3>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p>Price: ₹${convertedPrice.toFixed(2)}</p>
        <p>Quantity: ${quantity}</p>
      </div>
      <div class="price-section">
        <p class="item-total">Item Total: ₹${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;

    cartContent.appendChild(productElem);
  });

  totalPrice.textContent = `Total Price: ₹${totalBill.toFixed(2)}`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}
