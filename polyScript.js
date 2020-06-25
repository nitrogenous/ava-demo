window.onload = function () {
	(function (self) {
		var elementOfContent = document.getElementById('content');
		var elementIds = {
			mainSvg: 'svg-main',
			initialPoly: 'initial-poly'
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
		var initialPoints = [
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
	    	self.createSvgPath(elementIds.initialPoly, elementIds.mainSvg, initialPoints, 'black');
	    	self.setMouseEvents();
	    };

	    self.reset = function () {
	    	if ( document.getElementById(elementIds.mainSvg) !== null ) {
	    		document.getElementById(elementIds.mainSvg).remove();
	    	}

	    	elementOfContent.appendChild(self.createElementOfSvg(elementIds.mainSvg));
	    };

	    self.createElementOfSvg = function (elementId) {
	    	var elementOfSvg =  document.createElementNS("http://www.w3.org/2000/svg", 'svg');

			elementOfSvg.setAttribute('width', "500");
			elementOfSvg.setAttribute('height', "500"); 
			elementOfSvg.setAttribute('id', elementId);
			elementOfSvg.setAttribute('fill', 'transparent');
			elementOfSvg.setAttribute('style', 'position: absolute;');

			return elementOfSvg;
	    };

	    self.createSvgPath = function (elementId, appendElementId, points, color) {
	    	if (points.length < 2) {
	    		console.warn('Not enough poly points');
	    		return;
	    	}

	    	var pathOfSvg = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	    	var path = 'M' + points[0].x + ' ' + points[0].y;

	    	points.forEach(function (point) {
	    		path += ' L ' + point.x + ' ' + point.y;
	    	});

	    	path += ' Z';

	    	pathOfSvg.setAttribute('d', path);
	    	pathOfSvg.setAttribute('stroke', color);
	    	pathOfSvg.setAttribute('id', elementId);

	    	document.getElementById(appendElementId).appendChild(pathOfSvg);
	    };

	    self.setMouseEvents = function () {
			document.addEventListener('mousedown', self.onMouseDown);
	    	document.addEventListener('mousemove', self.onMouseMove);
			document.addEventListener('mouseup', self.onMouseUp);
	    };

	    self.onMouseDown = function () {
	    	return;
	    };

	    self.onMouseMove = function () {
	    	return;
	    };

	    self.onMouseUp = function () {
	    	return;
	    };


	    self.init();
	} ({}))	
}