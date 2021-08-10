/*make sure that the script tag this is in has id="hackerScript"

URL:
javascript: var x=document.createElement("script"); x.src="https://data.thingmaker.repl.co/scripts/adblock.js"; x.id="hackerScript"; if(!document.getElementById("hackerScript")){void document.body.appendChild(x);}
*/

document.removeEventListener("mousemove",mousem);
document.removeEventListener("click",mousec);
document.addEventListener("mousemove",mousem);
document.addEventListener("click",mousec);

if(!document.querySelector("style#hackerCSS")){
  var style = document.createElement("style");
  style.id="hackerCSS";
  style.innerHTML = `
.hackerSelected{
  outline:2px dashed yellow;
}
`;
  document.head.appendChild(style);
}

if(!document.getElementById("hackerPart")){
  var elmnt=document.createElement("div");
  elmnt.id="hackerPart";
  elmnt.style=(
    "background:black; color:white;"+
    "z-index:9999999; position:fixed; top:0px; left:0px;"+
    "padding:8px; width:50%; margin-left:25%; margin-top:20px;"
  );
  elmnt.innerHTML=(
    "<div style='float:right; cursor:pointer; font-size:30px;' id='hackerHide' onclick='hideHacker()'>&times;</div>"+
    "<h3 id='hackerTitle'>AdBlock</h3>"+
    "<p id='hackerDescripton'>Click the thingy yo want to go away</p>"+
    "<span id='hackerResult'></span>"
  );
  document.body.appendChild(elmnt);
}

var prevHover;
var prevback;
function mousem(e){
  if(document.getElementById("hackerPart")){
    var rst=document.getElementById("hackerResult");
    var x = e.clientX, y=e.clientY;

    var elemnt = document.elementFromPoint(x,y);
    
    if(elemnt && !elemnt.id.includes("hacker")){
      if(prevHover)prevHover.style.background=prevback;

      if(elemnt){prevback=elemnt.style.background;}else{prevback="white"}
      if(elemnt)elemnt.style.background="lightblue";

      prevHover=elemnt;
    }
  }
}
var cancelHackerClick = false;
var htm;
var prevSelected;
function mousec(e){
  if(document.getElementById("hackerPart")){
    if(cancelHackerClick){
      cancelHackerClick = false;
      return;
    }
    var x = e.clientX, y=e.clientY;
    var el = document.elementFromPoint(x,y);
    if(el && !el.id.includes("hacker")){
      htm = el;
      document.getElementById("hackerResult").innerHTML=(
        "<textarea id='hackerHtm' style='width:90%; height:200px; resize:none;'></textarea>"+
        "<br>"+
        "<button id='hackerElmntRemoveBtn' onclick='removeHtm()'>Make it go away</button>"+
        "<button id='hackerElmntReplaceBtn' onclick='replaceHtm(document.getElementById(\"hackerHtm\").value)'>Save changes</button>"
      );
      htm.style.background = prevback;
      document.getElementById("hackerHtm").value = htm.outerHTML;
      htm.style.background = "lightblue";
      
      if(prevSelected)prevSelected.classList.remove("hackerSelected");
      htm.classList.add("hackerSelected");
      prevSelected = htm;
    }
  }
}

function removeHtm(){
  htm.remove();
  cancelHackerClick = true;
  document.getElementById("hackerResult").innerHTML="";
}
function replaceHtm(value){
  htm.outerHTML = value;
}

function hideHacker(){
  if(prevHover)prevHover.style.background=prevback;
  if(prevSelected)prevSelected.classList.remove("hackerSelected");
  
  document.getElementById("hackerPart").remove();
  document.getElementById("hackerScript").remove();
}