//I use indexOf which is not working in ie8 and prior!!

(function(global) {
'use strict';
	var ArrayProto = Array.prototype;

	var NoJquery = function(arg) {
		return new NoJquery.init(arg);
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
			var i = 0, j, classU, arrElem;

			console.log('addClass');
			if ((typeof cls) === "string") {
				var arrCls = cls.split(" ");
				var clsU;

				//we need to go through all the elems' classes
				while((typeof this[i]) === "object"){
					classU = this[i].className.toUpperCase();
					arrElem = classU.split(" ");

					for (j = 0; j < arrCls.length; j++) {
						clsU = arrCls[j].toUpperCase();
						if (arrElem.indexOf(clsU) == -1)
							arrElem.push(arrCls[j]);
					};
					this[i].className = arrElem.join(" ").trim();
					i++;
				};
			}
			else {
				throw 'addClass: argument must be string!'; 
			}
			return this;
		},

		removeClass: function (cls) {
			var i = 0, j, classU, arrElem;

			console.log('removeClass');
			if ((typeof cls) === "string") {
				var arrCls = cls.split(" ");
				var clsU;

				//we need to go through all the elems' classes
				while((typeof this[i]) === "object"){
					classU = this[i].className.toUpperCase();
					arrElem = classU.split(" ");

					for (j = 0; j < arrCls.length; j++) {
						clsU = arrCls[j].toUpperCase();
						if (arrElem.indexOf(clsU) > -1)
							arrElem.splice(arrElem.indexOf(clsU), 1);
					};
					this[i].className = arrElem.join(" ").trim();
					i++;
				};
			}
			else {
				throw 'removeClass: argument must be string!'; 
			}
			return this;
		},

		toggleClass: function (cls) {
			var i = 0, j, classU, arrElem;

			console.log('toggleClass');
			if ((typeof cls) === "string") {
				var arrCls = cls.split(" ");
				var clsU;

				//we need to go through all the elems' classes
				while((typeof this[i]) === "object"){
					
					classU = this[i].className.toUpperCase();
					arrElem = classU.split(" ");

					for (j = 0; j < arrCls.length; j++) {
						clsU = arrCls[j].toUpperCase();
						if (arrElem.indexOf(clsU) > -1)
							arrElem.splice(arrElem.indexOf(clsU), 1);
						else
							arrElem.push(arrCls[j]);
					};
					this[i].className = arrElem.join(" ").trim();
					i++;
				};
			}
			else {
				throw 'toggleClass: argument must be string!'; 
			}
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