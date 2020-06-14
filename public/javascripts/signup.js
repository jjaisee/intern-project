document.getElementsByClassName("aaaaa")[0].addEventListener("click", function(){
  document.querySelector(".signup-popup").style.display = "flex";
});
document.querySelector(".close").addEventListener("click",function(){
  document.querySelector(".signup-popup").style.display = "none";
});
