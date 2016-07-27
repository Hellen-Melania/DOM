//for modal window

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus();
});


//main
var employeeArray = [],
	N = 2,
	salaryLimit = 200;


function getId() {   
	if(employeeArray.length ) {
		return employeeArray[employeeArray.length-1].id + 1;
	}
	return 0;
}

function checkDuplicateName(lastName) {
	if (!employeeArray.length){ return false; }
	for( var i = 0; i < employeeArray.length; i++) {
		if(employeeArray[i].employeeLastName == lastName){
			return true;
		}
	}
	return false;
}

function addLimit() {
	N = document.getElementById('employeeLimit').value;
}

function addNewEmployee() {

	if(employeeArray.length >= N){
		alert('We have limit ' + N + ' employeers!');
		$('#myModal').modal('hide'); // close modal window
		return false;
	}

	if(parseInt(document.getElementById('average-salary').textContent) >= salaryLimit){
		alert('The avarage salary is biggest than $200 ');
		$('#myModal').modal('hide'); // close modal window
		return false;
	}

	var formElements = document.getElementById("form-add-new").elements,
	    postData = {id: getId()};

	for(var i = 0; i < formElements.length; i++) {
	    if (formElements[i].type != "submit"){//we dont want to include the submit-buttom
	        postData[formElements[i].id] = formElements[i].value;
	    }
	}

	if(checkDuplicateName(postData.employeeLastName)){
		if(!confirm('Unfortunately, we already have had user with the same last name.\n Do you want to continue?')){
			return false;
		}
	};

	employeeArray.push(postData);
	outputEmployee(postData);
	$('#myModal').modal('hide'); // close modal window
}

function outputEmployee (obj) {
	var ul = document.getElementsByClassName('employeeList')[0], 
        li = document.createElement('li');

	for(var prop in obj){
		if(prop == "id") continue;

		var span = document.createElement('span');
		span.className += prop;
	    span.textContent = obj[prop];
		li.appendChild(span);
	}

	var btnDelete = document.createElement('button');
	btnDelete.setAttribute('id', 'delete-btn-employee-' + obj.id);
	btnDelete.className = 'btn btn-danger';
	btnDelete.textContent = 'X';
	btnDelete.addEventListener('click', deleteEmployeeFromList);
	li.appendChild(btnDelete);
	
	ul.appendChild(li);
	addCounter();
	averageSalary();
}

function addCounter() {
	var counter = document.getElementById('counter');
	counter.textContent = parseInt(counter.textContent) + 1;
}

function averageSalary() {
	var averageSalary = document.getElementById('average-salary'),
		allSalary = 0;
		
	for(var i = 0; i < employeeArray.length; i++){
		allSalary += parseInt(employeeArray[i].employeeSalary);
	}
	var res =  allSalary / employeeArray.length;
	if(isNaN(res)){
		res = 0;
	}
	averageSalary.textContent = res;
}

function deleteEmployeeFromList () {
	console.log(employeeArray);
	var deleteEmployee = parseInt(this.id.substr(20));
	for(var i =0; i < employeeArray.length; i++){
		if(employeeArray[i].id == deleteEmployee) {
       		employeeArray.splice(i, 1);
    	}
	}
	this.parentNode.remove();
	minusCounter();
	averageSalary();
	console.log(employeeArray);
}

function minusCounter() {
	var counter = document.getElementById('counter');
	counter.textContent = parseInt(counter.textContent) - 1;
}


document.getElementsByClassName("js-add-new-employee")[0].addEventListener("click", addNewEmployee); //[0] --> cuz class
document.getElementsByClassName("js-add-limit")[0].addEventListener("click", addLimit);