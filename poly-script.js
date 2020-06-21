window.onload = function () {
	(function (self) {
		var elementOfContent = document.getElementById('poly');

		self.init = function () {
			var points = [
			    { x : 100, y: 100 },
			    { x : 200, y: 50 },
			    { x : 300, y: 50 },
			    { x : 400, y: 200 },
			    { x : 350, y: 250 },
			    { x : 200, y: 300 },
			    { x : 150, y: 300 },
			]

			self.clearPoly();
			self.createPoly(points);
			self.setMouseEvents();
		};

		self.clearPoly = function () 
	{		while (elementOfContent.firstChild) {
				elementOfContent.removeChild(elementOfContent.firstChild);
			}
		};

		self.createPoly = function (points, color = 'black') {
			console.log(points);
			if (points.length < 2) {
				console.log('Not enought points');
				return;
			}

			var elementOfSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
			var pathOfSvg = document.createElementNS("http://www.w3.org/2000/svg", 'path');
			var path = 'M' + points[0].x + ' ' + points[0].y;

			for(const point of points) {
				path += ' L' + point.x + ' ' + point.y;
			}
		
			path += " Z";
		
			pathOfSvg.setAttribute('d', path);
			pathOfSvg.setAttribute('stroke', color);

			elementOfSvg.setAttribute('height', "500"); 
			elementOfSvg.setAttribute('width', "500");
			elementOfSvg.setAttribute('style', 'position: absolute;');
			elementOfSvg.setAttribute('fill', 'transparent');

			elementOfSvg.appendChild(pathOfSvg);
			elementOfContent.appendChild(elementOfSvg);
		};

		self.setMouseEvents = function () {
			document.addEventListener('mousemove', self.onMouseMove);
			document.addEventListener('mousedown', self.onMouseDown);
			document.addEventListener('mouseup', self.onMouseUp);
		};

		self.onMouseMove = function () {

		};

		self.onMouseDown = function () {

		};


		self.onMouseUp = function () {
			const poly1 = [ { x : 100, y: 100 },
			{ x : 200, y: 50 },
			{ x : 300, y: 50 },
			{ x : 400, y: 200 },
			{x: 150,y: 150}];
			const poly2 = [ {x: 150,y: 150}, { x : 400, y: 200 },   { x : 350, y: 250 },
			{ x : 200, y: 300 },
			{ x : 150, y: 300 },];

			//Generate the two sets of points for the split polygons
			//An algorithm for finding interceptions of two lines can be found in https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

			self.clearPoly();
			self.createPoly(poly1, 'blue');
			self.createPoly(poly2, 'green');
		};

		self.init();
	}({}))
};