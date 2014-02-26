var activeTodos = [];
var completeTodos = [];
var highestID = 0;
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
		highestID++;
		this["todo" + this.totalTodos] = {
			isComplete: false,
			input: input,
			id: highestID
		}
		activeTodos.push(this["todo" + this.totalTodos]);
		this.updateList(this["todo" + this.totalTodos]);
	},

	delete : function(id) {
		for( key in this ){
			if( this[key].id == id ){
				this[key].isComplete = true;
				if(completeTodos.length == 0){
					completeTodos.push(this["todo" + this.totalTodos]);
					var index = activeTodos.indexOf(this["todo" + this.totalTodos]);
					activeTodos.splice(index, 1);
				} else {
					for(var i = 0; i < completeTodos.length; i++){
						if(this["todo" + this.totalTodos] == completeTodos[i]){
							alert("This todo has already been deleted. ERROR!!!");
						} else {
							completeTodos.push(this["todo" + this.totalTodos]);
							var index = activeTodos.indexOf(this["todo" + this.totalTodos]);
							activeTodos.splice(index, 1);
						}
					}
				}
			}
		}
	},

	updateList : function(todoName) {
			alert(todoName);
			 var div = document.createElement('div');
			 div.className = 'checkbox';
			 div.innerHTML = '<label> <input type="checkbox" id="'+ todoName["id"] +'" value="">' + todoName["input"] + '</label>';
			 document.getElementById('checkList').appendChild(div);
		}
};














	// updateList : function(){
	// 	for( key in this ){
	// 		if(this[key].isComplete == true){
	// 			if(completeTodos.length == 0){
	// 				completeTodos.push(this[key]);
	// 			} else {
	// 				for(var i = 0; i < completeTodos.length; i++){
	// 					if(this[key] != completeTodos[i]){
	// 						completeTodos.push(this[key]);
	// 					}
	// 				}	
	// 			}
	// 		} else if(this[key].isComplete == false) {
	// 			if(activeTodos.length == 0){
	// 				activeTodos.push(this[key]);
	// 			} else {
	// 				for(var i = 0; i < activeTodos.length; i++){
	// 					if(this[key] != activeTodos[i]){
	// 						activeTodos.push(this[key]);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	for(var i = 0; i < activeTodos.length; i++){
	// 		if(activeTodos[i].isComplete == true){
	// 			activeTodos.splice(i, 1);
	// 		}
	// 	}
	// 	for(var i = 0; i < completeTodos.length; i++){
	// 		if(completeTodos[i].isComplete == false){
	// 			completeTodos.splice(i, 1);
	// 		}
	// 	}
	// },