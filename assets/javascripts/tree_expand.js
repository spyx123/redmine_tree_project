
function expand_tree_project(obj) {
	var a = obj.closest('div').find('a');
	if (a.text() == '+') {
		a.text('-');
		obj.closest('li').find('ul:first').show();
	} else {
		a.text('+');
		obj.closest('li').find('ul:first').hide();
	}	
}

function expand_parent(obj) {
	var parent = obj.closest('ul').closest('li').find('[type=checkbox]:first');
	
	if (parent.length > 0) {
		console.log('find parent: '+ parent.closest('label').text());
		var a = parent.closest('div').find('a');
		a.text('-');
		parent.closest('li').find('ul:first').show();

		expand_parent(parent);
	}
	
}

$(document).ready(function() {
  
	$('#custom_field_project_ids, #tracker_project_ids').find('[type=checkbox]').each(function(index) {
		if ($(this).closest('li').find('ul').length > 0) {
			$(this).closest('div').prepend('<div style="float: left;margin-top: 3px;width: 10px;"><a href="#" onclick="expand_tree_project($(this)); return false;" style="text-decoration:none;">+</a></div>');
		}
		if ($(this).is(":checked")) {
			console.log('expand_parent for ='+ $(this).closest('label').text());
			expand_parent($(this));
		}
		$(this).closest('li').find('ul').hide();
	});

	$('[name="custom_field[project_ids][]"], [name="tracker[project_ids][]"]').click(function(){
		$(this).closest('li').find('[type=checkbox]').prop('checked', $(this).is(":checked"));
	});

});
