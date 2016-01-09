//I use indexOf which is not working in ie8 and prior!!

(function(global) {
'use strict';
	var ArrayProto = Array.prototype;

	var NoJquery = function(arg) {
		return new NoJquery.init(arg);
	}

	function changeClass(cls, fn) {
		var i = 0, j, classU, arrElem;

		if ((typeof cls) === "string") {
			var arrCls = cls.split(" ");
			var clsU;

			//we need to go through all the elems' classes
			while((typeof this[i]) === "object"){
				classU = this[i].className.toUpperCase();
				arrElem = classU.split(" ");

				for (j = 0; j < arrCls.length; j++) {
					clsU = arrCls[j].toUpperCase();
					fn(arrElem, arrCls[j], clsU)
				};
				this[i].className = arrElem.join(" ").trim();
				i++;
			};

		}
		else {
			throw 'addClass: argument must be string!'; 
		}
	}


	NoJquery.prototype = {

		append: function (text) {
			console.log(text);
			return this;
		},

		remove: function () {
			console.log('remove');
			return this;
		},

		addClass: function (cls) {
			changeClass.call(this, cls, function(arrClassOfElem, strClass, strUClass) {
				if (arrClassOfElem.indexOf(strUClass) == -1)
					arrClassOfElem.push(strClass);
			});
			
			return this;
		},

		removeClass: function (cls) {
			changeClass.call(this, cls, function(arrClassOfElem, strClass, strUClass) {
				if (arrClassOfElem.indexOf(strUClass) > -1)
					arrClassOfElem.splice(arrClassOfElem.indexOf(strUClass), 1);
			});
			
			return this;
		},

		toggleClass: function (cls) {
			changeClass.call(this, cls, function(arrClassOfElem, strClass, strUClass) {
				if (arrClassOfElem.indexOf(strUClass) > -1)
					arrClassOfElem.splice(arrClassOfElem.indexOf(strUClass), 1);
				else
					arrClassOfElem.push(strClass);
			});

			return this;
		},

		Html: function (text) {
			console.log(text);
		}
	};

	NoJquery.init = function(arg) {
		var self = this;
		var selector = arg, l, i = 0;

		if( typeof selector === 'string' ) {
			self.nodes = document.querySelectorAll( selector );
			for(l = self.nodes.length; i < l; i++) 
				self[ i ] = self.nodes[ i ];
		} 
		else {
			self.nodes = null;
		}
		console.log(arg);
		//console.log('NoJquery: ' + this);
		console.log(self);
	}

	NoJquery.init.prototype = NoJquery.prototype;

	global.$ = NoJquery;

	NoJquery.create = function(newElemStr) {
		var parent = document.createElement('div');
		parent.innerHTML = newElemStr;
		console.log('create: ' + this);
		return parent.childNodes;
	}
	
}(window));