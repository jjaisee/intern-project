document.getElementById("signup-with-email").onclick = function () {
        location.href = "/signup";
    };


const signupButtons = document.getElementsByClassName("button-signup-popup");
let signupModal = function(){
  document.querySelector(".signup-popup").style.display = "flex";
  document.querySelector(".login-popup").style.display = "none";
}
for (let i = 0; i < signupButtons.length; i++) {
    signupButtons[i].addEventListener("click", signupModal, false);
}

const loginButtons = document.getElementsByClassName("button-login-popup");
let loginModal = function(){
  document.querySelector(".login-popup").style.display = "flex";
  document.querySelector(".signup-popup").style.display = "none";
}
for (let i = 0; i < loginButtons.length; i++) {
    loginButtons[i].addEventListener("click", loginModal, false);
}

// document.getElementsByClassName("button-login-popup")[0].addEventListener("click", function(){
//   document.querySelector(".login-popup").style.display = "flex";
// });

const closes = document.getElementsByClassName("close");
let closeModal = function(){
  document.querySelector(".signup-popup").style.display = "none";
  document.querySelector(".login-popup").style.display = "none";
}
for (let i = 0; i < closes.length; i++) {
    closes[i].addEventListener("click", closeModal, false);
}
// document.querySelector(".close").addEventListener("click",function(){
//   document.querySelector(".signup-popup").style.display = "none";
// });
