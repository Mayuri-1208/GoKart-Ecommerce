document.addEventListener("DOMContentLoaded", () => {
  let productId = localStorage.getItem("productId");
  let products = JSON.parse(localStorage.getItem("products"));
  let productDetails = document.getElementById("productDetails");

  if (products && productId) {
    let selectedProduct = products.find(v => v.id == productId);

    if (selectedProduct) {
      let rate = Math.round(selectedProduct.rating);
      renderProductDetails(selectedProduct, rate);
    } else {
      productDetails.innerHTML = `<p>No Product Found</p>`;
    }
  } else {
    productDetails.innerHTML = `<p>No Product Found</p>`;
  }
});

function renderProductDetails(product, rate) {
  const convertedPrice = (product.price * 80).toFixed(2);

  document.getElementById("productDetails").innerHTML = `
    <div class="product-container">
      <div class="image-section">
        <img src="${product.thumbnail}" alt="${product.title}">
      </div>

      <div class="info-section">
        <h2 class="product-title">${product.title}</h2>
        <p class="brand"><strong>Brand:</strong> ${product.brand}</p>
        <p class="category"><strong>Category:</strong> ${product.category}</p>

        <div class="rating-box">
          <span class="stars">${"⭐".repeat(rate)}</span>
          <span class="rating-value">${product.rating}/5</span>
        </div>

        <p class="description">${product.description}</p>

        <div class="price-box">
          <span class="price-label">Price:</span>
          <span class="price-value">₹${convertedPrice}</span>
          <span class="old-price">₹${(convertedPrice * 1.3).toFixed(2)}</span>
        </div>

        <div class="quantity-box">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" min="1" value="1">
        </div>

        <div class="buttons">
          <button id="addToCart" class="add-btn"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
          <button id="buyNow" class="buy-btn"><i class="fa-solid fa-bolt"></i> Buy Now</button>
          <button id="backToHome" class="home-btn"><i class="fa-solid fa-house"></i> Home</button>
        </div>
      </div>
    </div>

    <div class="review-section">
      <h3>Customer Reviews</h3>
      <hr>
      ${product.reviews.map(review => `
        <div class="review-box">
          <div class="hearts">${"❤".repeat(review.rating)}${"🖤".repeat(5 - review.rating)}</div>
          <p>${review.comment}</p>
        </div>
      `).join("")}
    </div>
  `;

  document.getElementById("addToCart").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("quantity").value);
    addToCart(product, qty);
  });

  document.getElementById("buyNow").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("quantity").value);
    addToCart(product, qty);
    window.location.href = "./cart.html";
  });

  document.getElementById("backToHome").addEventListener("click", () => {
    window.location.href = "./Home.html";
  });
}

function addToCart(Product, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.id === Product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + qty;
  } else {
    Product.quantity = qty;
    cart.push(Product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added ${qty} ${qty > 1 ? "items" : "item"} to cart successfully!`);
}
