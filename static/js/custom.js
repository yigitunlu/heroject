$(document).ready(function(){
	
	// Checkbox
	$('.checkbox').live("click", function(){
		if ($(this).hasClass('checked') == false) {
			$(this).addClass('checked');
			update_task_status($(this).next(), true);
		} else {
			$(this).removeClass('checked');
			update_task_status($(this).next(), false);
		}
	});

	// Dropdown
	$('.show-menu').hover(function(){
		$(this).find('.menu-list').toggle();
	});

	// Load Creater
	$('#ajax-crt').click(function(){
		$(this).parent().load('/project/create/');
	});

	function update_task_status(that, checked){

		var task_id = $(that).val();
		var slug = $('#project_slug').val();

		var active_tasks_url = "/project/" + slug + "/active_tasks/";
		var completed_tasks_url = "/project/" + slug + "/completed_tasks/";

		if (checked==true){
		task_is_done = 1
		} else {
		task_is_done = 0
		}

		$.ajax({

		url : "/tasks/update_status/",
		data : {'is_done': task_is_done, 'task_id': task_id}

		}).success(function(r){
			$('#project-active-tasks').load(active_tasks_url);
			$('#project-completed-tasks').load(completed_tasks_url);
			//$('.progress').load('.progress', function(){$(this).children().unwrap()});
		})
	};
});