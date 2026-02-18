console.log("checkout.js connected");

document.addEventListener("DOMContentLoaded", function () {

  const placeBtn = document.getElementById("placeOrderBtn");

  if (placeBtn) {
    placeBtn.addEventListener("click", placeOrder);
  } else {
    console.log("Button not found");
  }

  // Auto-fill name
  const nameField = document.getElementById("name");
  if (nameField) {
    nameField.value = localStorage.getItem("userName") || "";
  }

});

function placeOrder() {

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const paymentRadio = document.querySelector('input[name="payment"]:checked');

  if (!paymentRadio) {
    alert("Please select a payment method");
    return;
  }

  const payment = paymentRadio.value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = localStorage.getItem("total");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("payment", payment);
  formData.append("total", total);
  formData.append("items", JSON.stringify(cart));

  fetch("backend/place_order.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    console.log("Server Response:", data);

    if (data === "success") {
      document.getElementById("step-payment").classList.remove("active");
      document.getElementById("step-success").classList.add("active");
      localStorage.clear();
    } else {
      alert("Order failed: " + data);
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
}
