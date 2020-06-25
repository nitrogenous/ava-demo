window.onload = function () {
	(function (self) {
		var elementOfContent = document.getElementById('poly');
		var selectors = {
			svg: 'svg-board'
		}
		var cuttingLine = {
			isMoving: false,
			startPoint: {x: 0, y: 0},
			endPoint: {x: 0, y: 0}
		}

		self.init = function () {
			var points = [
			    { x : 100, y: 100 },
			    { x : 200, y: 50 },
			    { x : 300, y: 50 },
			    { x : 351.5625, y: 127.34375 },
			    { x : 350, y: 250 },
			    { x : 200, y: 300 },
			    { x : 150, y: 300 },
			    { x: 122.72727272727272, y: 190.9090909090909},
			]

			self.createPoly(points, 'green');
			self.setMouseEvents();
		};

		self.reset = function () {
			self.clearPoly();
			self.createSvgBoard();
		};

		self.clearPoly = function () {
			while (elementOfContent.firstChild) {
				elementOfContent.removeChild(elementOfContent.firstChild);
			}
		};

		self.createSvgBoard = function () {
			var elementOfSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

			elementOfSvg.setAttribute('id', selectors.svg);
			elementOfSvg.setAttribute('height', "500"); 
			elementOfSvg.setAttribute('width', "500");
			elementOfSvg.setAttribute('fill', 'transparent');
			elementOfSvg.setAttribute('style', 'position: absolute;');
		};

		self.createPoly = function (points, color) {
			if (points.length < 2) {
				console.log('Not enought points');
				return;
			}

			var pathOfSvg = document.createElementNS("http://www.w3.org/2000/svg", 'path');
			var path = 'M' + points[0].x + ' ' + points[0].y;

			points.forEach(function (point) {
				path += ' L' + point.x + ' ' + point.y;
			});
		
			path += " Z";
		
			pathOfSvg.setAttribute('d', path);
			pathOfSvg.setAttribute('stroke', color);


			
			elementOfSvg.appendChild(pathOfSvg);
			elementOfContent.appendChild(elementOfSvg);
		};

		self.setMouseEvents = function () {
			document.addEventListener('mousemove', self.onMouseMove);
			document.addEventListener('mousedown', self.onMouseDown);
			document.addEventListener('mouseup', self.onMouseUp);
		};

		self.onMouseMove = function (event) {
			var oldEndPoint = cuttingLine.endPoint;

			if (!cuttingLine.isMoving) {
				return;
			}
			console.log('sike')
			self.clearPoly();

			cuttingLine.endPoint = {
				x: event.clientX,
				y: event.clientY
			}

			self.createPoly([cuttingLine.startPoint, cuttingLine.endPoint], 'red');
		};

		self.onMouseDown = function (event) {
			cuttingLine = {
				isMoving: true,
				startPoint: {
					x: event.clientX,
					y: event.clientY
				}
			}
		};


		self.onMouseUp = function (event) {
			var poly1 = [ { x : 100, y: 100 },
			{ x : 200, y: 50 },
			{ x : 300, y: 50 },
			{ x : 400, y: 200 },
			{x: 150,y: 150}];
			var poly2 = [ {x: 150,y: 150}, { x : 400, y: 200 },   { x : 350, y: 250 },
			{ x : 200, y: 300 },
			{ x : 150, y: 300 },];

			cuttingLine = {
				isMoving: false,
				endPoint: {
					x: event.clientX,
					y: event.clientY
				}
			}

			// self.clearPoly();
			self.createPoly(cuttingLine.endPoint, 'red');

			// self.clearPoly();
			// self.createPoly(poly1, 'blue');
			// self.createPoly(poly2, 'green');
		};

		self.init();
	}({}))
};