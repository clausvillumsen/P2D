(function($){
	$(window).resize(function() {
	   	fixedFooter();
	   	js_height_init();
	   	init_hipster_screen();
	});
	$(document).ready(function() {
		fixedFooter();		
		js_height_init();
		init_parallax();
		init_scroll_navigate();
		// Sections backgrounds

		var pageSection = $(".home-section, .page-section, .small-section, .split-section");
		pageSection.each(function(indx){
		    
		    if ($(this).attr("data-background")){
		        $(this).css("background-image", "url(" + $(this).data("background") + ")");
		    }
		});
	});

	/* ---------------------------------------------
     Scroll navigation
     --------------------------------------------- */
    
    function init_scroll_navigate(){
        
        $(".local-scroll").localScroll({
            target: "body",
            duration: 1500,
            easing: "easeInOutExpo"
        });
        
        var sections = $(".home-section, .split-section, .page-section");
        var menu_links = $(".scroll-nav li a, .nbc-menu-links a");
        
        $(window).scroll(function(){
        
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
                $('.nbc-menu-links a[href="#' + active_section.attr("id") + '"]').addClass("active");
            });
            
        });
        
    }
    
 	/**
	* Change height dynamic, fixed footer if need
	*/
	function fixedFooter() {
	    $('#master').css('min-height', 0);
	    var heightNeed = 0;
	    // Caculate height, do no included padding
	    heightNeed = $(window).height() - ( $('#header').height() + $('#footer').height() + $('#toolbar').height() );

	    if ( $('#wpadminbar').length ) {
	        heightNeed -= $('#wpadminbar').height();
	    }
	    $('#master').css('min-height',heightNeed - 30);
	}

	/* --------------------------------------------
     Platform detect
     --------------------------------------------- */
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }
    
    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    
    // Detect touch devices    
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }

	/* ---------------------------------------------
	Sections helpers
	--------------------------------------------- */

	

	// Function for block height 100%
	function height_line(height_object, height_donor){
	    height_object.height(height_donor.height());
	    height_object.css({
	        "line-height": height_donor.height() + "px"
	    });
	}

	// Function equal height
	!function(a){
	    a.fn.equalHeights = function(){
	        var b = 0, c = a(this);
	        return c.each(function(){
	            var c = a(this).innerHeight();
	            c > b && (b = c)
	        }), c.css("height", b)
	    }, a("[data-equal]").each(function(){
	        var b = a(this), c = b.data("equal");
	        b.find(c).equalHeights()
	    })
	}(jQuery);
	// Progress bars

    var progressBar = $(".progress-bar");
    progressBar.each(function(indx){
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });
    
    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){
        console.log(1);
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

	/* --------------------------------------------
	 Header "Hipster Style"
	 --------------------------------------------- */
	var hsCont = $(".hs-cont");
	var hsWrap = $(".hs-wrap");
	var hsLine2 = $(".js-hs-line-2");
	var hsLine2Mar;

	function init_hipster_screen(){
	    hsLine2Mar = (hsCont.width() - hsWrap.width()) / 2;
	    
	    hsLine2.css({
	        marginLeft: -hsLine2Mar,
	        marginRight: -hsLine2Mar
	    });
	    
	}
	/* -------------------------------------------
	 Parallax
	 --------------------------------------------- */

	function init_parallax(){

	    // Parallax        
	    if (($(window).width() >= 1024) && (mobileTest == false)) {
	        $(".parallax-1").parallax("50%", 0.1);
	        $(".parallax-2").parallax("50%", 0.2);
	        $(".parallax-3").parallax("50%", 0.3);
	        $(".parallax-4").parallax("50%", 0.4);
	        $(".parallax-5").parallax("50%", 0.5);
	        $(".parallax-6").parallax("50%", 0.6);
	        $(".parallax-7").parallax("50%", 0.7);
	        $(".parallax-8").parallax("50%", 0.5);
	        $(".parallax-9").parallax("50%", 0.5);
	        $(".parallax-10").parallax("50%", 0.5);
	        $(".parallax-11").parallax("50%", 0.05);
	    }
	    
	}

	
	
})(window.jQuery)


/* ---------------------------------------------
 Height 100%
 --------------------------------------------- */
function js_height_init(){
    (function($){
        $(".js-height-full").height($(window).height());
       
    })(jQuery);
}


var MainJS = (function($){
	/*
	* WooCommerce Grid / List toggle
	*/	
	function toggleGridProducts() {
		$('ul.products').toggleClass('layout-list');
	}

	/**
   	* Draw Google Map
	* @param {Array} locations
	* @return null
	*/
	function initializeGoogleMap(locations) {    	

		// find <div id="map" />, #maker have data-image as marker image
		/* 
			wp_enqueue_script( 'google-map-js', 'https://maps.googleapis.com/maps/api/js', '', '', false );
		*/
    	var mapCanvas = document.getElementById('map');
    	var marker_icon = $('#marker').data('image');
    	
    	if (locations.length > 0 ) {
    		// Create Map
	    	var mapOptions = {
		      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
		      zoom: 12,
		      mapTypeId: google.maps.MapTypeId.ROADMAP,
		      mapTypeControl: false,
		      panControl: false,
		      ZoomControlStyle: {
			    style: google.maps.ZoomControlStyle.SMALL
			  }

		    }
		    
	    	var map = new google.maps.Map(mapCanvas,mapOptions);
	    	var infowindow = new google.maps.InfoWindow();

	    	// Draw marker
	    	var markers = [], i;

		    for (i = 0; i < locations.length; i++) {  
		    	var marker;
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(locations[i][1], locations[i][2]),
					map: map,
					icon: marker_icon
				});

				markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
					  infowindow.setContent(locations[i][0]);
					  infowindow.open(map, marker);
					  activeLocation(locations[i][1], locations[i][2]);
					}
				})(marker, i));


		    }

		    // event on location link
		    $('body').on('click', '.location-link', function(event) {
				map.setZoom(14);
				var id = $(this).data('id');
	    		map.setCenter(markers[id].getPosition());

	    		infowindow.setContent(locations[id][0]);
	    		infowindow.open(map, markers[id]);
	    		activeLocation(locations[id][1], locations[id][2]);

	    		window.setTimeout(function() {
				  map.panTo(markers[id].getPosition());
				}, 3000);
	    		
				event.preventDefault();
			});

		    // When resize window
		    $(window).on("debouncedresize", function( event ) {		
				google.maps.event.trigger(map, 'resize');	
			});
    	}
    	
    }

    /*
	* Add/Remove active class when clicked on location-link
	*/
    function activeLocation(latitude, longitude) {
    	$('.location-link').removeClass('active');
    	$('.location-link').filter(function(index) {
    		return ( $(this).data('latitude') == latitude && $(this).data('longitude') == longitude );
    	}).addClass('active');
    	
    }

	return {
		initializeGoogleMap: initializeGoogleMap,
		activeLocation: activeLocation,
		toggleGridProducts: toggleGridProducts
	}
})(window.jQuery);

jQuery(document).ready(function($) {

	// Init Google Map
	if ( $('#map').length ) {

		// Get all locations
		var locations = [];
		$.each($('.location-link'), function() {
			var data_latitude = $(this).data('latitude'),
				data_longitude = $(this).data('longitude'),
				data_address = $(this).data('address');
							
			if (data_latitude != '' && data_longitude != '' ) {
				var location = [ data_address,data_latitude,data_longitude];
				locations.push(location);
			};			
		});

		google.maps.event.addDomListener(window, 'load', MainJS.initializeGoogleMap(locations) );
	};
});