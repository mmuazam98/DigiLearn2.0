let inputs = document.querySelectorAll("input");
let form = document.querySelector(".form-login");
let username = document.getElementById("username");
let password = document.getElementById("password");
let error = document.getElementById("error");
let btn = document.querySelector(".btn");
let eye = document.getElementById("eye");
eye.style.display = "none";

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
  eye.style.display = "";
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
    eye.style.display = "none";
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});
document.addEventListener("DOMContentLoaded", () => {
  username.value = "";
  password.value = "";
});
eye.addEventListener("click", () => {
  eye.classList.toggle("fa-eye-slash");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});
form.addEventListener("submit", async (e) => {
  btn.innerHTML = '<div class="loader"></div>';
  let data = {
    username: username.value,
    password: password.value,
  };
  console.log(data);
  e.preventDefault();
  let config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let result = await fetch("/login", config);

  let final = await result.status; //result.json() for json code
  console.log(final);
  if (final === 401) {
    error.innerHTML = `<i class="far fa-exclamation-circle"></i> Invalid password.`;
    btn.innerHTML = "Login";
  } else if (final === 400) {
    error.innerHTML = `<i class="far fa-exclamation-circle"></i> Invalid username.`;
    btn.innerHTML = "Login";
  } else {
    window.location.href = "/home";
  }
});
