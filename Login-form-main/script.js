"use strict";
console.log(window);

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-card-form"),
    name = form.querySelector('[type="email"]'),
    password = form.querySelector('[type = "password"]'),
    remember = form.querySelector("#remcheck"),
    forgot = form.querySelector(".forgot");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      login: name.value,
      password: password.value,
    };
    if (remember.checked) {
      localStorage.setItem("user", JSON.stringify(data));
    }
  });
  function helloUser(helper) {
    const user = JSON.parse(localStorage.getItem("user"));
    helper(user);
  }

  function helper(user) {
    if (user) {
      return alert(`Hello ${user.login}`);
    }
  }
  helloUser(helper);

  function showData() {
    const data = JSON.parse(localStorage.getItem("user"));
    name.value = data.login;
    password.value = data.password;
  }
  showData();

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  forgot.addEventListener("click", () => {
    document.querySelector(".forgotten").style = "display: flex;";
    document.querySelector(".cancel").addEventListener("click", () => {
      document.querySelector(".forgotten").style = "display: none;";
    });
  });

  document.querySelector(".forgot-button").addEventListener("click", () => {
    if (
      isValidEmail(document.querySelector(".forgot-mail").value) === true &&
      document.querySelector(".forgot-password").value.length >= 8
    ) {
      document.querySelector(".forgotten").style = "display: none;";
      alert(
        `we have sent a letter to ${
          document.querySelector(".forgot-mail").value
        }, please check to accept`
      );
    } else {
      alert("Enter all of data");
    }
  });
});
