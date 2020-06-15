const signupButtons = document.getElementsByClassName("button-signup-popup");
let signupModal = function(){
  document.querySelector(".signup-popup").style.display = "flex";
}
for (let i = 0; i < signupButtons.length; i++) {
    signupButtons[i].addEventListener("click", signupModal, false);
}

// document.getElementsByClassName("button-signup-popup")[0].addEventListener("click", function(){
//   document.querySelector(".signup-popup").style.display = "flex";
// });
document.querySelector(".close").addEventListener("click",function(){
  document.querySelector(".signup-popup").style.display = "none";
});
