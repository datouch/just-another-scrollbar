(function($){
	setupScrollbar = function(that){
		var $target = $(that);
		$('<div class="trackHolder" ><div class="track" ></div></div>').appendTo($target.not(':has(.trackHolder)'));

		$target.each(function(index, elem){
			var $elem = $(elem),
					$track = $elem.find('.track'),
					$content = $elem.find('.jas-content'),
					$container = $elem.find('.jas-container'),
					ratio = $container.height()/$content.height();
			// Unbind old event handler
			$elem.find('.jas-container, .trackHolder').unbind('mousewheel');
			$track.unbind('drag');
			$track.unbind('dragstop');
			$track.unbind('dragstart');
			// If content size is larger than container
			if(ratio < 1){
				$track.removeClass('greater-ratio');
				$track.height(ratio * $container.height());
				/*

						Bind track drag event

				----------------------------*/
				$track.bind('drag', function(e, ui){
					var offsetScrolled = - ui.position.top/ratio;
					if( offsetScrolled < $container.height() - $content.height()){
						offsetScrolled = $container.height() - $content.height();
					}
					$content.css('top', (offsetScrolled) + 'px');
					e.stopPropagation();
				});

				$track.bind('dragstop', function(e){
					e.stopPropagation();
				});
				
				$track.bind('dragstart', function(e){
					e.stopPropagation();	
				});

				/*

						Bind mousewheel

				----------------------------*/
				$(elem).find('.jas-container, .trackHolder').bind('mousewheel', function(e, delta){
					var	value = (parseInt($content.css('top')) + delta*50),
							ratioMove;
					$track.show();
					$elem.trigger('scrolling');
					if(value > -25){
						value = 0;
						$elem.trigger('hittop');
					}
					else if(value < ($container.height() - $content.height()) ){
						value = $container.height() - $content.height();
						$elem.trigger('hitbottom');
					}
					$content.css('top', value + "px" );
					ratioMove = value * ratio;
					$track.css('top', -ratioMove + 'px');
				});
			}
			else {
				$track.addClass('greater-ratio');
				$content.css('top', '0px');
			}
		});

		$('.jas-relative').mouseenter(function(){
			$(this).find('.track:not(.greater-ratio)').stop(false, true).show();
		})

		$('.jas-relative').mouseleave(function(){
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
