// Checkbox
$(document).ready(function(){
	
	$('.checkbox').click(function(){
		$(this).toggleClass('checked');
	});

	$('.show-menu').hover(function(){
		$(this).find('.menu-list').toggle();
	});
});