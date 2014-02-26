var activeTodos = [];
var completeTodos = [];

var toDo = {
	
	totalTodos: 0,

	create : function(input) {
		for(key in this){
			if(this[key].input == input){
				alert("This ToDo matches another ToDo that is already on your list, please enter a different ToDo");
				return false;
			} else if(input.length === 0 || jQuery.trim(input).length === 0) {
				alert("This ToDo is empty, please enter a valid ToDo");
				return false;
			}
		}
		this.totalTodos++;
		this["todo" + this.totalTodos] = {
			isComplete: false,
			input: input,
			id: this.totalTodos
		}
		activeTodos.push(this["todo" + this.totalTodos]);
		this.updateList(this["todo" + this.totalTodos]);
	},

	delete : function(id) {
		for( key in this ){
			if( this[key].id == id ){
				this[key].isComplete = true;
				if(completeTodos.length >= 0 ){
					completeTodos.push(this[key]);
					var index = activeTodos.indexOf(this[key]);
					activeTodos.splice(index, 1);
			  }
			}
		}
	},

	updateList : function(todoName) {
			 var div = document.createElement('div');
			 div.className = 'checkbox';
			 div.innerHTML = '<label> <input type="checkbox" id="'+ todoName["id"] +'" value="">' + todoName["input"] + '</label>';
			 document.getElementById('checkList').appendChild(div);
		},

	init : {

		create : function() {
			$('.inputToDo').keyup(function(e){
				if(e.keyCode == 13){
					var data = $('.inputToDo').val();
					toDo.create(data);
					$('.inputToDo').val('');
				}
			});
		},

		delete : function() {
			$(document).on("click", ".checkbox input", function(){
				toDo.delete($(this).attr("id"));
				$(this).parent().parent().hide();
			})
		}
	}

};

$(document).ready(function(){
	toDo.init.create();
	toDo.init.delete();
});