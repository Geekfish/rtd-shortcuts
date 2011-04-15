// Readthedocs keyboard shortcuts
// Copyright (c) 2011, Eleni Lixourioti
// Released under the BSD license
// http://creativecommons.org/licenses/BSD/
//
// ==UserScript==
// @name          Readthedocs keyboard shortcuts
// @namespace     http://github.com/Geekfish
// @description   Added shortcuts for read the docs 
// @include       http://readthedocs.org/docs/**.html*
// ==/UserScript==

window.addEventListener('keypress', function(e) {
    var code;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;

    switch(code) {
        case 105: //i
			clickAnchorByHtmlContent('index');
			break;
		case 110: //n
		case 39:  //right
			clickAnchorByHtmlContent('next');
			break;
		case 112: //p
		case 37:  //left
			clickAnchorByHtmlContent('previous');
			    break;
		case 102: //f
			searchField = child(child(document.getElementById('searchbox'), 2), 1);
			searchField.focus();
	  	    break;
	}
}, false);

function child(element, index) {
    index = index || 1; 
    element = (element.firstChild && element.firstChild.nodeType != 1) ? next(element.firstChild) : element.firstChild; 
    for(var i=1; i < index;i++) {
        (function() {     
            return element = next(element);             
        })();            
    }
    return element;
}
function next(element) {
    do { 
        element = element.nextSibling;
    } while (element && element.nodeType != 1);
    return element;                
}

function clickAnchorByHtmlContent(content) {
    allAnchors = document.getElementsByTagName('a');
    for (i=0; i < allAnchors.length; i++) {
		if (allAnchors[i].innerHTML == content) {
			var cancelled = false;
			if (document.createEvent) {
				var event = document.createEvent("MouseEvents");
				event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				cancelled = !allAnchors[i].dispatchEvent(event);
			}
			else if (allAnchors[i].fireEvent) {
				cancelled = !allAnchors[i].fireEvent("onclick");
			}
			if (!cancelled) {
				window.location = allAnchors[i].href;
			}
		}
    }
}
