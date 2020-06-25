window.onload = function () {
	(function (self) {
		var elementOfContent = document.getElementById('content');
		var elementIds = {
			mainSvg: 'svg-main'
		};
		var cuttingLine = {
			isMoving: false,
			startPoint: {
				x: null, 
				y: null
			},
			endPoint: {
				x: null,
				y: null
			}
		};
		var boardPoints = [
			{ x : 100, y: 100 },
		    { x : 200, y: 50 },
		    { x : 300, y: 50 },
		    { x : 351.5625, y: 127.34375 },
		    { x : 350, y: 250 },
		    { x : 200, y: 300 },
		    { x : 150, y: 300 },
		    { x: 122.72727272727272, y: 190.9090909090909},
	    ];

	    self.init = function () {
	    	self.reset();
	    };

	    self.reset = function () {
	    	if ( document.getElementById(elementIds.mainSvg) !== null ) {
	    		document.getElementById(elementIds.mainSvg).remove();
	    	}

	    	elementOfContent.appendChild(self.createElementOfSvg(elementIds.mainSvg));
	    }

	    self.createElementOfSvg = function (elementId) {
	    	var elementOfSvg =  document.createElementNS("http://www.w3.org/2000/svg", 'svg');

			elementOfSvg.setAttribute('id', elementId);
			elementOfSvg.setAttribute('height', "500"); 
			elementOfSvg.setAttribute('width', "500");
			elementOfSvg.setAttribute('fill', 'transparent');
			elementOfSvg.setAttribute('style', 'position: absolute;');

			return elementOfSvg;
	    };


	    self.init();
	} ({}))	
}