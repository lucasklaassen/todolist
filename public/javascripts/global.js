var toDoController = {

	refreshView : function() {
		//EMPTY TODO LISTS
		$('.activeToDos').html("");
		var activeToDos = '';
		$('.completedToDos').html("");
		var completedToDos = '';
		$.getJSON( '/todolist', function( data ) {
		// For each todo in our JSON, add a checkbox and label containing the input todo string
			$.each(data, function(){
					if(this.isComplete == "false"){
						activeToDos += '<div class="checkbox">';
						activeToDos += '<input type="checkbox" id="'+ this._id +'" value="">';
						activeToDos += '<label class="toDoInput">' + this.input + '</label>';
						activeToDos += '<a href="#" class="delete" id="'+ this._id +'"><i class="glyphicon glyphicon-remove"></i></a>';
						activeToDos += '</div>';
					} else {
						completedToDos += '<div class="checkbox">';
						completedToDos += '<input type="checkbox" id="'+ this._id +'" value="" checked>';
						completedToDos += '<label class="toDoInput">' + this.input + '</label>';
						completedToDos += '<a href="#" class="delete" id="'+ this._id +'"><i class="glyphicon glyphicon-remove"></i></a>';
						completedToDos += '</div>';
					}
			});
			//Inject the todo strings into their existing HTML lists
			$('.activeToDos').html(activeToDos);
			$('.completedToDos').html(completedToDos);
			//init event functions
			//Delete Todo
			$('a.delete').on('click', toDoController.deleteToDoItem);
			//Toggle Todo
			$(".checkbox input[type=checkbox]").on("change", toDoController.toggleToDoItem);
			//Update Todo
			$("label.toDoInput").on("click", function() {
					var prevContent = $(this).html();
					$(this).replaceWith("<input type=\"text\" value=\"" + prevContent + "\" class=\"editToDoInput\"  />");
					$('.editToDoInput').focus();
					$('.editToDoInput').on("keyup", function(e){
						if(e.keyCode == 13){
							var updateData = {
								'input': $(this).val()
							}
							var ID = $(this).prev().attr('id');
							toDoController.updateToDoItem(updateData,ID);
						}
					});
			});	
		});

	},

	createToDoItem : function(errorCount,input) {	
			// Check and make sure errorCount's still at zero
			if(errorCount === 0) {
			  // Use AJAX to post the object to our adduser service
			  $.ajax({
			    type: 'POST',
			    data: input,
			    url: '/addtodo',
			    dataType: 'JSON'
			  }).done(function( response ) {
			    // Check for successful (blank) response
			    if (response.msg === '') {
			      // Clear the form inputs
			      $('.inputToDo').val('');
			      // Update the table
			      toDoController.refreshView();
			    }
			    else {
			      // If something goes wrong, alert the error message that our service returned
			      alert('Error: ' + response.msg);
			    }
			  });
			}
			else {
			  // If errorCount is more than 0, error out
			  alert('Please fill in all fields');
			  return false;
			}
	},

	toggleToDoItem : function(event){
			event.preventDefault();
			  // If it is, compile all user info into one object
			  if(this.checked){
			  	var toggleData = {
			  		'isComplete': "true"
			  	}
			  } else {
			  	var toggleData = {
			  		'isComplete': "false"
			  	}
			  }
			  // Use AJAX to post the object to our adduser service
			  $.ajax({
			    type: 'PUT',
			    data: toggleData,
			    url: '/toggletodo/' + $(this).attr('id'),
			    dataType: 'JSON'
			  }).done(function( response ) {
			    // Check for successful (blank) response
			    if (response.msg === '') {
			      // Update the table
			      toDoController.refreshView();
			    }
			    else {
			      // If something goes wrong, alert the error message that our service returned
			      alert('Error: ' + response.msg);
			    }
			  });
	},

	updateToDoItem : function(data, id){
			  // Use AJAX to post the object to our adduser service
			  $.ajax({
			    type: 'PUT',
			    data: data,
			    url: '/updatetodo/' + id,
			    dataType: 'JSON'
			  }).done(function( response ) {
			    // Check for successful (blank) response
			    if (response.msg === '') {
			      // Update the table
			      toDoController.refreshView();
			    }
			    else {
			      // If something goes wrong, alert the error message that our service returned
			      alert('Error: ' + response.msg);
			    }
			  });
	},

	deleteToDoItem : function(event){
	  event.preventDefault();
	  // Pop up a confirmation dialog
	  var confirmation = confirm('Are you sure you want to delete this todo?');
	  // Check and make sure the user confirmed
	  if (confirmation === true) {
	    // If they did, do our delete
	    $.ajax({
	      type: 'DELETE',
	      url: '/deletetodo/' + $(this).attr('id')
	    }).done(function( response ) {
	      // Check for a successful (blank) response
	      if (response.msg === '') {
	      }
	      else {
	        alert('Error: ' + response.msg);
	      }
	      // Update the table
	      toDoController.refreshView();
	    });
	  }
	  else {
	    // If they said no to the confirm, do nothing
	    return false;
	  }
	}

};

$(document).ready(function(){
	toDoController.refreshView();
	$('.inputToDo').on("keyup", function(e){
		if(e.keyCode == 13){
			var errorCount = 0;
			if($('.inputToDo').val() === ''){
				errorCount++;
			};
			var inputData = {
				'input': $(this).val(),
				'isComplete': "false"
			}
			toDoController.createToDoItem(errorCount,inputData);
		}
	});
});