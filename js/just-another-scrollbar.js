(function($){

	setupScrollbar = function(that){
		var $target = $(that);
		$('<div class="trackHolder" ><div class="track" ></div></div>').appendTo($target.not(':has(.trackHolder)'));
		$('.track').unbind();
		$('.container, .trackHolder').unbind();

		$target.each(function(index, elem){
			var $elem = $(elem),
					$track = $elem.find('.track'),
					$content = $elem.find('.content'),
					$container = $elem.find('.container'),
					ratio = $container.height()/$content.height(),
					tid = 0;
			$track.height(ratio * $container.height());

			/*
					Bind track drag event
			----------------------------*/
			$track.bind('drag', function(e, ui){
				clearTimeout(tid);
				$track.show();
				var offsetScrolled = - ui.position.top/ratio;
				if( offsetScrolled < $container.height() - $content.height()){
					offsetScrolled = $container.height() - $content.height();
				}
				$content.css('top', (offsetScrolled) + 'px');
			});

			$track.bind('dragstop', function(){
				tid = setTimeout(function(){
					$track.fadeOut();
				}, 1500);
			});

			/*
					Bind mousewheel
			----------------------------*/
			$(elem).find('.container, .trackHolder').bind('mousewheel', function(e, delta){
				clearTimeout(tid);
				var	value = (parseInt($content.css('top')) + delta*50),
						ratioMove;

				$track.show();

				if(value > -25){
					value = 0;
				}
				else if(value < ($container.height() - $content.height()) ){
					value = $container.height() - $content.height();
				}

				$content.css('top', value + "px" );
				ratioMove = value * ratio;
				$track.css('top', -ratioMove + 'px');

				tid = setTimeout(function(){
					$track.fadeOut();
				}, 1500);
			});
		});

		$('.trackHolder').mouseenter(function(){
			$(this).find('.track').show();
		})

		$('.trackHolder').mouseleave(function(){
			$(this).find('.track:not(.ui-draggable-dragging)').fadeOut('slow');
		})

		$('.track').draggable({ axis: 'y',
														containment: 'parent'
		});
	};

	 $.fn.just_another_scrollbar = function() {
		setupScrollbar(this);
  };
})(jQuery);