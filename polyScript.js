window.onload = function () {
	(function (self) {
		var elementOfContent = document.getElementById('content');
		var elementIds = {
			mainSvg: 'svg-main',
			initialPoly: 'initial-poly',
			cuttingLine: 'cuttingLine'
		};
		var cuttingLine = {
			isMoving: false,
			startPoint: {
				x: null, 
				y: null
			},
			endPoint: {
				x: 12,
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
		    { x : 150, y: 300 }
	    ];

	    self.init = function () {
	    	self.reset();
	    	self.createSvgPath(elementIds.initialPoly, elementIds.mainSvg, initialPoints, 'black');
	    	self.setMouseEvents();
	    };

	    self.reset = function () {
	    	self.removeElementById(elementIds.mainSvg);

	    	elementOfContent.appendChild(self.createElementOfSvg(elementIds.mainSvg));
	    };

	    self.removeElementById = function (elementId) {
	    	if ( document.getElementById(elementId) !== null ) {
	    		document.getElementById(elementId).remove();
	    	}
	    }

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

	    self.onMouseDown = function (event) {
	    	cuttingLine = {
	    		isMoving: true,
	    		startPoint: {
	    			x: event.clientX,
	    			y: event.clientY
	    		}
	    	}
	    	return;
	    };

	    self.onMouseMove = function (event) {
	    	if (!cuttingLine.isMoving) {
	    		return;
	    	}

	    	cuttingLine.endPoint = {
    			x: event.clientX,
    			y: event.clientY
	    	}

	    	self.removeElementById(elementIds.cuttingLine);
	    	self.createSvgPath(elementIds.cuttingLine, elementIds.mainSvg, [cuttingLine.startPoint, cuttingLine.endPoint], 'red');
	    	return;
	    };

	    self.onMouseUp = function (event) {
	    	cuttingLine.isMoving = false;
	    	cuttingLine.endPoint = {
    			x: event.clientX,
    			y: event.clientY
	    	};

	    	self.findCollidingLines({startPoint: cuttingLine.startPoint, endPoint: cuttingLine.endPoint}, initialPoints);

	    	return;
	    };

	    self.findCollidingLines = function (cuttingLine, polyLines) {
	    	for (var i = 0; i < polyLines.length; i++) {
	    		var secondPointIndex = i + 1 === polyLines.length ? 0 : i + 1;
	    		var secondLine = {
	    			startPoint: polyLines[i], 
	    			endPoint: polyLines[secondPointIndex]
	    		};

	    		if (self.isLinesIntersect(cuttingLine, secondLine)) {
	    			console.log(self.getIntersectionPoint(cuttingLine, secondLine));
	    		}

	    	}
	    }

	    self.isLinesIntersect = function (firstLine, secondLine) {
	    	var det, gamma, lambda;

			det = (firstLine.endPoint.x - firstLine.startPoint.x) * (secondLine.endPoint.y - secondLine.startPoint.y) - (secondLine.endPoint.x - secondLine.startPoint.x) * (firstLine.endPoint.y - firstLine.startPoint.y);

			if (det === 0) {
				return false;
			} else {
				lambda = ((secondLine.endPoint.y - secondLine.startPoint.y) * (secondLine.endPoint.x - firstLine.startPoint.x) + (secondLine.startPoint.x - secondLine.endPoint.x) * (secondLine.endPoint.y - firstLine.startPoint.y)) / det;
				gamma = ((firstLine.startPoint.y - firstLine.endPoint.y) * (secondLine.endPoint.x - firstLine.startPoint.x) + (firstLine.endPoint.x - firstLine.startPoint.x) * (secondLine.endPoint.y - firstLine.startPoint.y)) / det;

				return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
			}
	    };

	    self.getIntersectionPoint = function (firstLine, secondLine) {
	    	return math.intersect(
	    		[firstLine.startPoint.x, firstLine.startPoint.y],
	    		[firstLine.endPoint.x, firstLine.endPoint.y],
	    		[secondLine.startPoint.x, secondLine.startPoint.y],
	    		[secondLine.endPoint.x, secondLine.endPoint.y]
	    	);
	    };

	    self.init();
	} ({}))	
}