/*
var x="qwwertyuioplkjhgfdsdfvbh";
var no=3454;
var i=0;
function typ(){
	if(i<no)
	{
		f=f*(-1);
		document.getElementById("dem").innerHTML=String(i) + " +";
		i++;
		setTimeout(typ,0.01);
	}
}
*/
const mq = window.matchMedia( "(min-width: 400px)" );

if (!mq.matches) {
       alert("Please Visit Desktop to see the site");
} 