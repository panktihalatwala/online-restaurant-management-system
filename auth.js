// =====================
// SIGN UP
// =====================
function signup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some(u => u.email === email);
  if (exists) {
    alert("Email already registered!");
    return;
  }

  users.push({
    name,
    email,
    password,
    role: "user"
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
  window.location.href = "login.html";
}

// =====================
// LOGIN
// =====================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("Invalid login credentials");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    if (foundUser.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  });
}

// =====================
// ADMIN CHECK
// =====================
function checkAdmin() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== "admin") {
    alert("Access denied");
    window.location.href = "login.html";
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  document.getElementById("totalUsers").innerText = users.length;
}

// =====================
// LOGOUT
// =====================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// =====================
// NAV AUTH LINKS
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const authLinks = document.getElementById("auth-links");
  if (!authLinks) return;

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    authLinks.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  } else {
    authLinks.innerHTML = `
      <a href="#">Hi, ${user.name}</a>
      <a href="#" onclick="logout()">Logout</a>
    `;
  }
});
