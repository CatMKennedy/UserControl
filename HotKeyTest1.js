/**
 * HotKeyTest1.js
 * 
 * @author Cationa M. Kennedy (cmk)
 * 
 * Exploring event handling + some hotkeys for changing fontsize of a particular text ID in a document.
 * If the mouse is over the element, pressing up or down arrow will increase/decrease size. 
 * (in HotKeyTest2.js - select classes instead of specific Ids).
 * 
 */
// event.type must be keypress
function getChar(event) {
  if (event.which == null) {
    return String.fromCharCode(event.keyCode) // IE
  } else if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}


function getEventType()
{   
  if (event.type == "keypress")
  {
     var c = getChar(event);   
     alert("char = " + c);
  }
  else
  {
     alert(event.type);
  }
}


/* Mouseover and MouseOut functions */
function mOver(obj)
{
   obj.style.color = "red";
   //obj.onkeypress=function(){getEventType("keypress")};

}
function mOut(obj)
{
   obj.style.color = "blue";
  
}

function mClick(obj)
{
   obj.style.color = "green";
   
   //obj.onkeydown = checkKey;
  
}

function preventBubble(e)
{
	if (!e) var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
}


function mClickOnText(obj)
{
   //Standard code (traditional)  - alternative to addEventListener?

	function checkKeyInText(obj, e) {

    	e = e || window.event;

    	if (e.keyCode == '38') {
       		// up arrow
        	alert("up arrow - obj.style.fontSize = " + obj.style.fontSize);
        	obj.style.color = "blue";
    	}
    	else if (e.keyCode == '40') {
        	// down arrow
        	alert("down arrow");
        	obj.style.color = "orange";
    	}
	}
	
   	obj.style.color = "green";
   	
   	obj.onkeydown = checkKeyInText;
  
}



/* Press a key within the context of an object. It seems that a mouse click is necessary to focus on the object, after the mouseover */

function handleKeyDown(obj)
{
   
   var c = getChar(event); 
   alert("char = " + c);
   
   if (c == "a") {
      obj.style.fontSize = "25px";
   }
   else if (c == "z") {
      obj.style.fontSize = "15px";
   }
   else if (c == "r") {   
      obj.style.color = "red";
   }
   else if (c == "b") {
      obj.style.color = "blue";
   } 
   else if (c == "g") {
      obj.style.color = "green";
   }
}

//Standard code - alternative to addEventListener?

function checkKey(obj, e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        alert("up arrow");
        obj.style.color = "orange";
        obj.style.fontSize = "25px";
    }
    else if (e.keyCode == '40') {
        // down arrow
        alert("down arrow");
        obj.style.fontSize = "15px";
    }
}


/* Main function - this version assumes that the document is made up a fixed number of components with fixed ids */

 (function() { 
	var text1 = document.getElementById('text1');
	var overText1 = false;

	text1.addEventListener("mouseover", function() {
    	mOver(text1); overText1 = true;
	}, false);
	text1.addEventListener("mouseout", function() {
   	 	mOut(text1); overText1 = false;  //or event.target = text1
	}, false);

	text1.addEventListener("click", function() {
   	 	mClick(text1); 
	}, false);
	 
	//text element does not seem to recognise keydown - so has to be "document"
	document.addEventListener("keydown", function() {
		if (overText1==true) { 
			//alert('keydown');
			var e = window.event;
			//CheckKey(text1, e);  seems the "e" wasn't recognised...
			//... but the below works...
   			if (e.keyCode == '38') {
        		// up arrow
        		text1.style.color = "orange";
        		text1.style.fontSize = "22px";
   			}
			else if (e.keyCode == '40') {
        		// down arrow
        		text1.style.fontSize = "15px";
   			}
			
   		}
	}, false);
})();


/* 
 * TODO increase or decrease fontsize by a fraction - find out why this code doesn't work.'
 			var strFs = text1.style.fontSize; 
			alert("String = " + strFs);  //string is empty - not sure why - should be a number followed by "px"
			var intFs = parseInt(strFs); //actually need to remove the "px"
			intFs+= 5; 
			text1.style.fontSize = intFs.toString()+"px";*/