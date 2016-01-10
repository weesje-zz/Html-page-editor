	
var editor = (function(global, menuIds, boxIds){
'use strict';
	
	var editWindow = $("#editWindow"); //global.document.getElementById("editWindow"); 
	var menuWindow = $("#menuWindow")[0];
	var currentMenu = -1;
	var self = this;
	var arrMenuIds = menuIds;
	var arrMenus = [], arrBoxes = [];
	
	var initFile = function(menu, box) {
		$('#fd_New')[0].addEventListener('click', function() {
			self.file.prototype.newPage();
			enableMenuItem(1);
		}, false);
		$('#fd_Del')[0].addEventListener('click', function() {
			self.file.prototype.deletePage();
			for (var i = 1; i < arrMenus.length; i++) {
				disableMenuItem(1);
			};
		}, false);
		//arrMenus[0][1] = true;
		return new makeProp(0, menu, box);
	};
	
	var initPage = function(menu, box) {
		return new makeProp(1, menu, box);
	};

	function menuHandler() {
		var nextMenu = arrMenuIds.indexOf(this.id);
		if (currentMenu == nextMenu) return;
		if (!arrMenus[nextMenu][1]) return;
		if (currentMenu > -1) {
			arrBoxes[currentMenu].toggleClass('hidden');
			arrMenus[currentMenu][0].toggleClass('current');
		}
		//indexOf doesn't work in ie8--
		currentMenu = arrMenuIds.indexOf(this.id)
		arrBoxes[currentMenu].toggleClass('hidden');
		arrMenus[currentMenu][0].toggleClass('current');
	}

	function setFullHeightMain() {
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		editWindow[0].style.height = h - editWindow[0].offsetTop + 'px';
		menuWindow.style.height = h - editWindow[0].offsetTop + 'px';
	}

	function makeProp(index, menu, box) {
		//the class current is on the a tag
		arrMenus[index] = [$('#' + menu + ' a'), false];
		//arrMenus[index][0] = $('#' + menu + ' a'); 
		//arrMenus[index][1] = false;
		arrBoxes[index] = $('#' + box);
		//the click eventListner should be on the li tag, because it contains the id
		$('#' + menu)[0].addEventListener('click', menuHandler, false);
	}

	function disableMenuItem(index) {
		arrMenus[index][0].addClass('disabled');
		arrMenus[index][1] = false;
	}

	function enableMenuItem(index) {
		arrMenus[index][0].removeClass('disabled');
		arrMenus[index][1] = true;
	}

//initializing editor
	setFullHeightMain();
	window.addEventListener('resize', setFullHeightMain);

	self.file = initFile(menuIds[0], boxIds[0]);
	self.file.prototype = {
		newPage: function() {
			editWindow.removeChildren();
			editWindow.appendAsChild('<div id="htmlBody"></div>', true);
		},
		deletePage: function() {
			editWindow.removeChildren();
		}
	}

	self.page = initPage(menuIds[1], boxIds[1]);
	self.page.prototype = {
		addHeader: function() {
			//currentMenu++;
			console.log("addHeader " + currentMenu);
		},
		removeHeader: function() {
			//currentMenu--;
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
	
	enableMenuItem(0);

});