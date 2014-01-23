define(function(require){

    'use strict';

    var $ = require('jquery');

	/* Open all external links and PDF in new window
	******************************************************/
	var baseUrl = window.location.host;

	$("a[href^='http:']:not([href*='" + baseUrl + "']), a[href^='https:']:not([href*='" + baseUrl + "']), a[href$='.pdf']:not([href*='" + baseUrl + "']), a[href$='.pdf']").on('click', function() {
		$(this).attr('target','_blank');
	});


});