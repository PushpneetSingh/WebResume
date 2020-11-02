var mybutton = document.getElementById("myBtn");
var navi = document.getElementById("nav");
window.onscroll = function() {
	scrollFunction()
};
function scrollFunction() {
  if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
    mybutton.style.display = "block";
	navi.style.display = "none";
  } else {
    mybutton.style.display = "none";
	navi.style.display = "block";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}