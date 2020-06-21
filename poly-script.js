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
		};

		self.clearPoly = function () 
	{		while (elementOfContent.firstChild) {
				elementOfContent.removeChild(elementOfContent.firstChild);
			}
		};

		self.createPoly = function (points, color = 'black') {
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

		self.init();
	}({}))
};