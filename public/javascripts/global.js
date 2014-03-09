// TODO MODEL
// function toDoItem(id, input){
// 	this.id = id;
// 	this.input = input;
// 	this.isComplete = false;
// };

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
			$('a.delete').on('click', toDoController.deleteToDoItem);
			$(".checkbox input[type=checkbox]").on("change", toDoController.toggleToDoItem);

		});

	},

	createToDoItem : function(event) {
			event.preventDefault();

			// Super basic validation - increase errorCount variable if any fields are blank
			var errorCount = 0;

			if($('.inputToDo').val() === ''){
				errorCount++;
			};

			// Check and make sure errorCount's still at zero
			if(errorCount === 0) {

			  // If it is, compile all user info into one object
			  var newToDo = {
			    'input': $('.inputToDo').val(),
			    'isComplete': "false"
			  }

			  // Use AJAX to post the object to our adduser service
			  $.ajax({
			    type: 'POST',
			    data: newToDo,
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

	deleteToDoItem : function(event){
	  event.preventDefault();

	  // Pop up a confirmation dialog
	  var confirmation = confirm('Are you sure you want to delete this todo?');

	  // Check and make sure the user confirmed
	  if (confirmation === true) {

	  	console.log($(this));

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

	// totalTodos: 0,

	// toDoList: {},

	// init : {

	// 	// createToDoItemDisplay : function() {
	// 	// 	$('.inputToDo').on("keyup", function(e){
	// 	// 		if(e.keyCode == 13){
	// 	// 			var input = $('.inputToDo').val();
	// 	// 			toDoController.createToDoItem(input);
	// 	// 			$('.inputToDo').val('');
	// 	// 		}
	// 	// 	});
	// 	// },

	// 	// toggleToDoItemDisplay : function() {
	// 	// 	$(document).on("change", ".checkbox input[type=checkbox]", function(){
	// 	// 		toDoController.toggleToDoItem($(this).attr('id'));
	// 	// 	});
	// 	// },

	// 	// deleteToDoItemDisplay : function() {
	// 	// 	$(document).on("click", "a.delete", function(){
	// 	// 		toDoController.deleteToDoItem($(this).attr("id"));
	// 	// 	});
	// 	// },

	// 	// updateToDoItemDisplay : function() {
	// 	// 	$(document).on("click", "label.toDoInput", function() {
	// 	// 			var prevContent = $(this).html();
	// 	// 			$(this).replaceWith("<input type=\"text\" value=\"" + prevContent + "\" class=\"editToDoInput\"  />");
	// 	// 			$('.editToDoInput').focus();
	// 	// 			$('.editToDoInput').on("keyup", function(e){
	// 	// 				if(e.keyCode == 13){
	// 	// 					var input = $('.editToDoInput').val();
	// 	// 					var id = $(this).prev().attr("id");
	// 	// 					toDoController.updateToDoItem(id, input);
	// 	// 					if(input === ""){
	// 	// 						$(this).replaceWith('<label class="toDoInput">' + prevContent + '</label>');
	// 	// 					} else {
	// 	// 						$(this).replaceWith('<label class="toDoInput">' + input + '</label>');
	// 	// 					}
	// 	// 				}
	// 	// 			});
	// 	// 	});	
	// 	// }

	// },

	// toggleToDoItem : function(id){
	// 	this.toDoList[id].isComplete = !this.toDoList[id].isComplete;
	// 	this.refreshView();
	// },

	// deleteToDoItem : function(id){
	// 	delete this.toDoList[id];
	// 	this.refreshView();
	// },

	// updateToDoItem : function(id, input) {
	// 	if(input === ""){
	// 		alert("Yeah right buddy! Type something.")
	// 		return this.toDoList[id].input = this.toDoList[id].input;
	// 	} else {
	// 		return this.toDoList[id].input = input;
	// 	}
	// }

};

$(document).ready(function(){
	// toDoController.init.createToDoItemDisplay();
	// toDoController.init.toggleToDoItemDisplay();
	// toDoController.init.updateToDoItemDisplay();
	// toDoController.init.deleteToDoItemDisplay();
	toDoController.refreshView();
	$('#btnAddToDo').on('click', toDoController.createToDoItem);
});