/* ---------------- LOGIN CHECK ---------------- */
function requireLogin() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Please login to continue");
    window.location.href = "login.html";
  }
}

/* ---------------- CART LOGIC ---------------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(name, price) {
  requireLogin(); // protect add to cart

  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

/* LOAD CART PAGE */
function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty 🛒</p>`;
    totalEl.innerText = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    cartContainer.innerHTML += `
      <div class="cart-row">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  totalEl.innerText = "₹" + total;
}


/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* ---------------- CHECKOUT FLOW ---------------- */

function showStep(id) {
  document.querySelectorAll(".checkout-step").forEach(step => {
    step.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function goToAddress() {
  showStep("step-address");
}

function goToPayment() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Please fill all address details");
    return;
  }

  showStep("step-payment");
}

function placeOrder() {
  alert("🎉 Order placed successfully!");
  localStorage.removeItem("cart");
  cart = [];
  showStep("step-success");
}

function goHome() {
  window.location.href = "index.html";
}

/* AUTO LOAD */
window.onload = function () {
  loadCart();
};
