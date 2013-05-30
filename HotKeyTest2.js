/** HotKeyTest2.js
 * @author Cationa M. Kennedy (cmk)
 * 
 * Tests some hotkeys for changing fontsize of a specified class of text elements in a document.
 * Typically these elements are paragraphs. They are expected to be labelled with "class=text-body" in the html. 
 * If the mouse is over one of these elements, pressing up or down arrow will increase/decrease its size
 * and change its colour. TODO: (1) detect additional classes (e.g. "heading", "navigation", etc) and
 * allow them to be modified using hotkeys. (2) provide fine-control of size and appearance, 
 * using additional hotkeys to change colour, background,  emphasis (for text).
 * (3) test on different browsers and improve code.
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
   //Standard code (traditional)  - alternative to addEventListener

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


/* Main function - assumes that text chunks in documenent are labelled with "class=text-body" */

 (function() { 
		
	var textElements = document.getElementsByClassName('text-body');  //get text elements of class text body
	var overText = null;    //Which text element is the mouse over? Not over any element initially 
	

	for (var i = 0; i < textElements.length; i++) {
		var textPart = textElements[i];   //Usually a paragraph
    	
		textPart.addEventListener("mouseover", function() {
    		this.style.color = "red"; overText = this;  //currently over this text element
		}, false);
		textPart.addEventListener("mouseout", function() {
   	 		this.style.color = "blue"; overText = null;  //not over text
		}, false);
		textPart.addEventListener("click", function() {
			this.style.color = "green";
		}, false);
	 }
	//text element does not seem to recognise keydown - so has to be "document"
	document.addEventListener("keydown", function() {
		if (overText != null) { //On a text element
			textPart = overText;  //get the text that the mouse is over
			
			var e = window.event;
			//CheckKey(textPart, e) doesn't work - seems the "e" wasn't recognised...
			//... but the below works...
   			if (e.keyCode == '38') {
        		// up arrow
        		textPart.style.color = "orange";
        		textPart.style.fontSize = "22px";
   			}
			else if (e.keyCode == '40') {
        		// down arrow
        		textPart.style.fontSize = "15px";
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