(function($) {
	$(document).ready(function() {
		var opts = {
			zoom: 15,
			center: new google.maps.LatLng(53.385873, -1.471471),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
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
							"visibility": "on"
						},
						{
							"lightness": 33
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

		$("input[name=mode]").change(function() {
			var val = $(this).val();

			if(val == "photos") {
				$("p, h2, hgroup").hide();
				$("img.lazy").show();
			} else if(val == "text") {
				$("p, h2, hgroup").show();
				$("img.lazy").hide();
			} else {
				$("p, h2, hgroup").show();
				$("img.lazy").show();
			}
		})
	});
})(jQuery);