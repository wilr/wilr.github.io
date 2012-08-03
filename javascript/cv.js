(function($) {
	$(document).ready(function() {
		var isLocalScrolling = false;
		
		var highlight = function(anchor) {
			$("nav li a").removeClass('active');
			$("nav li").find("[href=#"+ $(anchor).attr('id') +"]").addClass('active');
		};
		
		$.localScroll.hash({
			queue: true,
			duration: 700,
			
			onBefore: function(e, anchor, target) {
				isLocalScrolling = true;
				
				highlight(anchor);
			},
			onAfter: function(anchor, settings) {
				isLocalScrolling = false;
			}
		});

		$.localScroll({
			queue: true,
			duration: 700,
			hash: true,
			
			onBefore:function(e, anchor, target) {
				isLocalScrolling = true;
				
				highlight(anchor);
			},
			
			onAfter: function(anchor, settings) {
				isLocalScrolling = false;
			}
		});
		
		/**
		 * On scroll of the document we want to get the position of all the sections and track
		 * when we go over the top of one of them.
		 */
		$(document).scroll(function() {
			if(isLocalScrolling) return;
			
			var sections = $("section");
			
			var body = $("body").position();
			var height = $("body").height();
			var scroll = $(document).scrollTop();
			var offset = 120;
			
			if(sections) {
				var active = sections.first();
				
				sections.each(function(i, elem) {
					
					if($(elem).position().top < (scroll + offset)) {
						active = $(elem);
					}
				});
				
				// window.location.hash = active.attr('id');
				
				highlight(active);
			}
		});
	});
})(jQuery);