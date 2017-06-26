function make(id) {

	if (window === this) {
		return new make(id);
	}

	this.target = document.getElementById(id);

	return this;
};

make.prototype = {

	// Вращение элемента.
	// Параметры: turns - количество оборотов (1, 2...)
	//			  duration - длительность анимации в секундах (1, 2...) 
	//			  axis - ось вращения ("X", "Y", "Z")
	//			  linear - равномерность анимации (true, false)

	circuit: function(turns, duration, axis, linear) {
		ctx = this;
		
		var angle = 360;

		function rotate() {
			linear ? ctx.target.style.transition = duration + "s linear" : ctx.target.style.transition = duration + "s";
			switch(axis) {
				case "X": ctx.target.style.transform = "rotateX(" + (turns * angle) + "deg)"; break;
				case "Y": ctx.target.style.transform = "rotateY(" + (turns * angle) + "deg)"; break;
				default: ctx.target.style.webkitTransform = "rotate(" + (turns * angle) + "deg)";
			}

			setTimeout(function() {
				ctx.target.style.transition = "0s";
				ctx.target.style.webkitTransform = "rotate(0deg)";
			}, (duration * 1000));
		}

		rotate();
		return ctx;
	},

	// Пульсирование элемента.
	// Параметры: beats - количество пульсаций (1, 2...)
	//			  duration - длительность анимации в секундах (1, 2...)

	pulse: function(beats, duration) {
		ctx = this;

		var currentOpacity = getComputedStyle(ctx.target).opacity;
		var interval = duration * 1000 / beats;
		var counter = 0;

		function pulse() {
			if(counter < (beats * 2)) {
				if(counter % 2 === 0) {
					ctx.target.style.transition = (duration / beats * 0.5) + "s";
					ctx.target.style.opacity = "0.5";

					setTimeout(function() {	
						pulse();
					}, (interval * 0.5));
				}
				else {
					ctx.target.style.transition = (duration / beats * 1.5) + "s";
					ctx.target.style.opacity = "1";

					setTimeout(function() {	
						pulse();
					}, (interval * 1.5));
				}
			}
			else {
				ctx.target.style.opacity = currentOpacity;
			}
			counter++;
		}

		pulse();
		return ctx;
	},

	// Тряска элемента.
	// Параметры: waves - количество покачиваний (1, 2...)
	//			  angle - угол максимального наклона в градусах (10, 20, 45...)
	//			  duration - длительность анимации в секундах (1, 2...) 

	shake: function(waves, angle, duration) {
		ctx = this;

		ctx.target.style.transition = (duration / waves) + "s";

		var rotationMatrix = getComputedStyle(ctx.target).transform;

		if(rotationMatrix === null) {
			var values = rotationMatrix.split('(')[1];
			values = values.split(')')[0];
			values = values.split(',');
			var sin = values[1];
			var currentAngle = Math.round(Math.asin(sin) * (180/Math.PI));
		}
		else {
			currentAngle = 0;
		}

		var interval = duration * 1000 / waves;
		var counter = 0;

		function shake() {

			if(counter < waves) {
				ctx.target.style.webkitTransform = "rotate(" + (currentAngle + angle) + "deg)";
				angle = -angle;

				setTimeout(function() {
					shake();
				}, (interval));
			}

			else {
				ctx.target.style.webkitTransform = "rotate(" + currentAngle + "deg)";
			}
			counter++;
		}

		shake();

		return ctx;
	}
};