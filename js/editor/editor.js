	
var editor = (function(global, menuIds, boxIds){
'use strict';
	
	var editWindow = $("#editWindow")[0]; //global.document.getElementById("editWindow"); 
	var currentMenu = -1;
	var self = this;
	var arrMenuIds = menuIds, arrBoxIds = boxIds;

	function menuHandler() {
		if (currentMenu > -1) {
			$('#' + arrBoxIds[currentMenu]).toggleClass('hidden');
			$('#' + arrMenuIds[currentMenu] + ' a').removeClass('current');
		}
		//indexOf don't work in ie8--
		currentMenu = arrMenuIds.indexOf(this.id)
		$('#' + arrBoxIds[currentMenu]).toggleClass('hidden');
		$('#' + this.id + ' a').addClass('current');
	}

	function makeFile(menu, box) {
		
		$('#' + menu)[0].addEventListener('click', menuHandler, false);
		
		return {
			new: function() {
				
			}
		}
	}

	function makePage(menu, box) {

		$('#' + menu)[0].addEventListener('click', menuHandler, false);
				
		return {
			addHeader: function() {
				currentMenu++;
				console.log("addHeader " + currentMenu);
			},
			removeHeader: function() {
				currentMenu--;
				console.log("removeHeader " + currentMenu);
			},
			hideHeader: function() {
				console.log("hideHeader");
			},
			addFooter: function() {
				console.log("addFooter");
			},
			removeFooter: function() {
				console.log("removeFooter");
			},
			hideFooter: function() {
				console.log("hideFooter");
			}
		}		
	}

	self.file = makeFile(arrMenuIds[0], arrBoxIds[0]);

	self.page = makePage(arrMenuIds[1], arrBoxIds[1]);
	
});

editor.prototype.test = function(argument){
	console.log("hehehe");
};