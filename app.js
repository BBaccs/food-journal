function Meals(date, breakfast, lunch, dinner){
    this.date = date;
    this.breakfast = breakfast;
    this.lunch = lunch;
    this.dinner = dinner;
}

function UI(){}


//Local storage constructor
// function Store(){}


// UI Prototypes:

UI.prototype.addMealsToList = function(meals){
    console.log(meals);
    //grab list
    const list = document.getElementById('meal-list');
    //create a new element
    const row = document.createElement('tr');
    //insert html
    row.innerHTML = `
        <td>${meals.date}</td>
        <td>${meals.breakfast}</td>
        <td>${meals.lunch}</td>
        <td>${meals.dinner}</td>
        <td class="delete">X</th>
    `;
    //append row to list
    list.appendChild(row);
}

UI.prototype.clearMeals = function(){
    date = document.getElementById('date').value = '',
    breakfast = document.getElementById('breakfast').value = '',
    lunch = document.getElementById('lunch').value = '',
    dinner = document.getElementById('dinner').value = '';
}

UI.prototype.showAlert = function(alertClass, message){
    //grab container and form so we can insert the alert into container but before form
    const container = document.getElementById('wrapper');
    const form = document.getElementById('meal-form');
    //create alert div
    const alertDiv = document.createElement('div');
    //Set class names
    alertDiv.className = `alert ${alertClass}`;
    //insert text
    alertDiv.appendChild(document.createTextNode(`${message}`));
    //insert before form
    container.insertBefore(alertDiv, form);

    setTimeout(function(){
       alertDiv.remove(); }, 5000
    );
}


//Event Listeners

//Add meal to list event listener
document.getElementById('meal-form').addEventListener('submit', function(e){
    const ui = new UI,
         meals = new Meals;
         dateValidation = /[a-z]/gi;
         meals.date = document.getElementById('date').value,
         meals.breakfast = document.getElementById('breakfast').value,
         meals.lunch = document.getElementById('lunch').value,
         meals.dinner = document.getElementById('dinner').value;

    if (meals.date === '' || meals.breakfast === '' || meals.lunch === '' || meals.dinner === '') {
        ui.showAlert('error', 'Please fill out all fields. Thank you.');
    } else if(dateValidation.test(meals.date)){
        ui.showAlert('error', 'Date can only contain numbers and \/\'s, please use MM/DD/YY format');
    } else {
        ui.addMealsToList(meals);
        ui.showAlert('success', 'Today\'s meals have been sucessfully added to the list!');
        ui.clearMeals();     
    }
    e.preventDefault();
});

//Delete meal from list
document.getElementById('meal-list').addEventListener('click', function(e){
    if (e.target.className === 'delete') {
        e.target.parentElement.remove();
    }
});