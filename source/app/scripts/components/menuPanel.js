define(function(require){

	'use strict';

	var $ = require('jquery');

	/* Menu Toggler
	 ************************/

	var container = 	'.js-menuPanel',
		//items = 		'.js-stackPanel-item',
		handler = 		'.js-menuPanel-button',
		handlerTeam = 		'.js-menuPanel-button-team',
		content = 		'.js-menuPanel-content',
		activeclass = 	'is-opened',
		triggerEvent =	'click'
		;

	var toggleAction = function(e){
		$(this)
			.parents(container)
				.toggleClass(activeclass);

		$('body').stop().scrollTo(container, 500, {offset: {top:-20}});

		// Additional stuff
	};

	$(handler).on(triggerEvent, toggleAction);
	$(handlerTeam).on(triggerEvent, function(e){
		e.preventDefault();	
		$('body').stop().scrollTo('.js-bioPanel', 500, {offset: {top:-90}});
		
		// This one works silly on iPhone
		//$('.js-bioPanel').first().click();
	});

});