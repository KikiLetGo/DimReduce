 function gosper( size ) {

		size = ( size !== undefined ) ? size : 1;

		function fractalize( config ) {

			var output;
			var input = config.axiom;

			for ( var i = 0, il = config.steps; 0 <= il ? i < il : i > il; 0 <= il ? i ++ : i -- ) {

				output = '';

				for ( var j = 0, jl = input.length; j < jl; j ++ ) {

					var char = input[ j ];

					if ( char in config.rules ) {

						output += config.rules[ char ];

					} else {

						output += char;

					}

				}

				input = output;

			}

			return output;

		}

		function toPoints( config ) {

			var currX = 0, currY = 0;
			var angle = 0;
			var path = [ 0, 0, 0 ];
			var fractal = config.fractal;

			for ( var i = 0, l = fractal.length; i < l; i ++ ) {

				var char = fractal[ i ];

				if ( char === '+' ) {

					angle += config.angle;

				} else if ( char === '-' ) {

					angle -= config.angle;

				} else if ( char === 'F' ) {

					currX += config.size * Math.cos( angle );
					currY += - config.size * Math.sin( angle );
					path.push( currX, currY, 0 );

				}

			}

			return path;

		}

		//

		var gosper = fractalize( {
			axiom: 'A',
			steps: 4,
			rules: {
				A: 'A+BF++BF-FA--FAFA-BF+',
				B: '-FA+BFBF++BF+FA--FA-B'
			}
		} );

		var points = toPoints( {
			fractal: gosper,
			size: size,
			angle: Math.PI / 3 // 60 degrees
		} );

		return points;

	}