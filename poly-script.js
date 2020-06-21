(function (self) {
	var elementOfContent = document.getElementById('poly');

	self.init = function () {
		self.clearPoly();
		self.createPoly(points);
	};

	self.clearPoly = function () {
		while (elementOfContent.firstChild) {
			elementOfContent.removeChild(elementOfContent.firstChild);
		}
	};

	self.createPoly = function (points, color = black) {
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
	
		svgPath.setAttribute('d', path);
		svgPath.setAttribute('stroke', color);

		svgElement.setAttribute('height', "500"); 
		svgElement.setAttribute('width', "500");
		svgElement.setAttribute('style', 'position: absolute;');
		svgElement.setAttribute('fill', 'transparent');

		svgElement.appendChild(svgPath);
		content.appendChild(svgElement);
	};

	window.onload = function () {
		self.init();
	};
}({}))