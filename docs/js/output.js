(function($){
  $(document).ready(function() {
    $('#toggleExpand').click(function() {
    	$('#navbarSupportedContent').toggleClass('minimize');
    	$('#layoutApp').toggleClass('minimize');
    })
  })  
})(window.jQuery)
