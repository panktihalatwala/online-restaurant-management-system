function placeOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const payment = document.querySelector('input[name="payment"]:checked').value;

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
    if (data === "success") {
      document.getElementById("step-payment").classList.remove("active");
      document.getElementById("step-success").classList.add("active");
      localStorage.clear();
    }
  });
}
document.getElementById("name").value =
  localStorage.getItem("userName") || "";

