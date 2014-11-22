var myName = prompt("What is your name, child?")
	if (myName.length > 0) {
	    confirm("You are on your own. Welcome.")
	}
	else {
	    var myName = prompt("That is not your name, child. Tell me your name.")
	    	if (myName.length > 0) {
	    		confirm("You are on your own. Welcome.")
	    	}
	    	else {
	    	var myName = prompt("Why are you lying, child? Tell me your name.")
	    		if (myName.length > 0) {
		    		confirm("You are on your own. Welcome.")
		    	}
			    else {
			    	prompt("No, child. Tell me your name.")
			    		if (true) {
			    			confirm("You are on your own. Welcome.")
			    		}
			    }
	    	}
	};

var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);

var clicks = 0;
	function onClick() {
       clicks += 0.5;
       document.getElementById("clicks").innerHTML = clicks;
};

var Memory = (function () {
	var r = {
		images: [
		'stag/stag1.jpg',
		'stag/stag2.jpg',
		'stag/stag3.jpg',
		'stag/stag4.jpg',
		'stag/stag5.jpg',
		'stag/stag6.jpg',
		'stag/stag7.jpg',
		'stag/stag8.jpg'
		],
		colors: ['#99b433', '#1e7145', '#ff0097', '#9f00a7', '#7e3878', '#603cba', '#1d1d1d', '#00aba9', '#eff4ff', '#2d89ef', '#2b5797', '#ffc40d', '#e3a21a', '#da532c', '#ee1111', '#b91d47'],
		


		shuffle: function (array) { // http://stackoverflow.com/a/6274398
			var counter = array.length,
				temp = null,
				index = 0;

			// While there are elements in the array
			while (counter > 0) {
				// Pick a random index
				index = Math.floor(Math.random() * counter);

				// Decrease counter by 1
				counter -= 1;

				// And swap the last element with it
				temp = array[counter];
				array[counter] = array[index];
				array[index] = temp;
			}

			return array;
		},

		resolvePair: function (activatedElms) {
			var pair = [];

			activatedElms.each(function (i, elm) {
				elm = $(elm);

				pair[i] = elm.data('url');
			});

			if (pair[0] === pair[1]) {
				activatedElms.addClass('solved');
				activatedElms.removeClass('activated');
				confirm("I am so proud.");
			} else {
				activatedElms.addClass('failed');
				setTimeout(function () {
					activatedElms.removeClass('failed');
					activatedElms.removeClass('activated');
					confirm("You disappoint me, child.");
				}, 500);
			}
		},


		handleResolving: function () {
			$('#game').on('click', '.memory-element:not(.solved)', function () {
				var elm = $(this),
					activatedElms = [],
					pair = [];

				elm.addClass('activated');

				activatedElms = $('.activated');

				if (activatedElms.length === 1) {
					// For the time being, do nothing
				} else if (activatedElms.length > 1) {
					r.resolvePair(activatedElms);
				}

				if ($('.solved').length === $('.memory-element').length) {
					if (confirm('You did well, child. Come with me, let us play once more.')) {
						$('.memory-element').remove();
						r.draw();
					}
				}
	
			});
		},


		draw: function () {
			var game = $('#game'),
				shuffledPairs = [];
				shuffledColors = r.shuffle(r.colors);

			$.each(r.images, function (i, imageUrl) {
				var elm = '<div class="memory-element" data-url="' + imageUrl + '"><img width="150" height="150" src="' + imageUrl + '" alt="Am I the correct one?" /></div>';

				shuffledPairs.push(elm);
				shuffledPairs.push(elm);
			});

			$.each(r.shuffle(shuffledPairs), function (i, imageElm) {
				imageElm = $(imageElm);

				imageElm.css('background-color', '#092772');

				game.append(imageElm);
			});
		}

	},
	u = {
		initialize: function () {
			r.draw();
			r.handleResolving();
			r.resolvePair();
		}
	};
	
	return u;
}());

$(function () {
	Memory.initialize();
});