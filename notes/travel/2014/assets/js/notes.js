(function($) {
	$(document).ready(function() {
		var opts = {
			zoom: 2,
			center: new google.maps.LatLng(0, -0),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			panControl: false,
    		zoomControl: true,
    		streetViewControl: false,
    		scaleControl: true,
    		mapTypeControl: false,
			styles: [
				{
					"featureType": "water",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#acbcc9"
						}
					]
				},
				{
					"featureType": "landscape",
					"stylers": [
						{
							"color": "#f2e5d4"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#c5c6c6"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#e4d7c6"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#fbfaf7"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#c5dac6"
						}
					]
				},
				{
					"featureType": "administrative",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road"
				},
				{
					"featureType": "poi.park",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"lightness": 20
						}
					]
				},
				{},
				{
					"featureType": "road",
					"stylers": [
						{
							"lightness": 20
						}
					]
				}
			]
		};

		var map = new google.maps.Map(document.getElementById('map'), opts);

		$("img.lazy").lazyload({
			effect : "fadeIn"
		});

		/**
		 * drawLine 
		 *
		 * Takes a li node and draws a line from start-lat|lng to the 
		 * end-lat|lng. Can optionally be clicked for the marker content.
		 */
		var drawLine = function(elem, map) {
			var departure = new google.maps.LatLng($(elem).data('start-lat'), $(elem).data('start-lng'));
			var destination = new google.maps.LatLng($(elem).data('end-lat'), $(elem).data('end-lng'));
  			
  			var line = new google.maps.Polyline({
				path: [departure, departure], // animates to destination
				geodesic: true,
				strokeColor: '#e74c3c',
				strokeOpacity: 0.3,
				strokeWeight: 4,
				map: map
			});
			
			var step = 0, length = 100, speed = 5;
			
			// renders a frame of the line animated.
			var render = function() {
				step += 1;

				if (step > length) {
					return false;
				} else {
					line.setPath([
						departure, 
						google.maps.geometry.spherical.interpolate(
							departure, destination,step / length
						)
					]);

					return true;
				}
			};

			// animates the line with raf
			(function animateLine() {
				if(render()) {
					requestAnimationFrame(animateLine);
				} else {

				}
			})();
		};

		/**
		 * drawMarker
		 *
		 * Takes a li node and draws a marker for the point. Clicking the marker
		 * will popup the article within the marker.
		 */
		var drawMarker = function(elem, map) {
			var image = 'assets/css/marker.png';

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng($(elem).data('lat'), $(elem).data('lng')),
				map: map,
				icon: image,
				animation: google.maps.Animation.DROP,
			});
		};

		// draw the individual line segments or the popups on the page. Each
		// one should be in the markup.
		$("#steps li").each(function(i, elem) {
			if($(elem).data('start-lat')) {
				drawLine(elem, map);
			} else {
				drawMarker(elem, map);
			}
		});
	});
})(jQuery);