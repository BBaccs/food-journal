class Meals {
    constructor (date, breakfast, lunch, dinner){
        this.date = date;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
    }
}

class UI {
    addMealsToList = function(meals){
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

    //Set value of form inputs to empty string
    clearInputFields = function() {
        document.getElementById('date').value = '',
        document.getElementById('breakfast').value = '',
        document.getElementById('lunch').value = '',
        document.getElementById('dinner').value = '';
    }

    showAlert = function(alertClass, message){
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
        //remove alert after 5 seconds
        setTimeout(function(){
           alertDiv.remove(); 
        }, 5000);
    }
}

//Local storage functionality
class Store {
    static getLocalMeals() {
        let meals;
        if (localStorage.getItem('meals') === null) {
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;
    }
    static displayLocalMeals() {
        const meals = Store.getLocalMeals();

        meals.forEach(function(meal){
            const ui = new UI;

            ui.addMealsToList(meal);
        });
    }
    static setMealsToLocal(meal) {
        const meals = Store.getLocalMeals();

        meals.push(meal);
    
        localStorage.setItem('meals', JSON.stringify(meals));
    }
    static removeLocalMeals(date) {
        const meals = Store.getLocalMeals();

        meals.forEach(function(meal, index){
        if(meal.date === date) {
            meals.splice(index, 1);
        }
    });
    localStorage.setItem('meals', JSON.stringify(meals));
  }
}

//Event Listeners

document.addEventListener('DOMContentLoaded', Store.displayLocalMeals);

//Add meal to list event listener
document.getElementById('meal-form').addEventListener('submit', function(e){
    //Instantiate necessarry instances
    const ui = new UI,
         meals = new Meals();
      
         //create dateValidation
         const dateValidation = /[a-z]/gi;

         //set meals instance properties to be equal to the value of the designated input in the field
         meals.date = document.getElementById('date').value,
         meals.breakfast = document.getElementById('breakfast').value,
         meals.lunch = document.getElementById('lunch').value,
         meals.dinner = document.getElementById('dinner').value;

    if (meals.date === '' || meals.breakfast === '' || meals.lunch === '' || meals.dinner === '') {
        //Error Alert, for empty fields
        ui.showAlert('error', 'Please fill out all fields. Thank you.');
    } else if(dateValidation.test(meals.date)){
        //Error alert, for entering a date that is not valid (contains letters)
        ui.showAlert('error', 'Date can only contain numbers and \/\'s, please use MM/DD/YY format');
    } else {
        //Add meals to list
        ui.addMealsToList(meals);

        //Add to LS
        Store.setMealsToLocal(meals);

        //Show success alert for adding meals
        ui.showAlert('success', 'Today\'s meals have been sucessfully added to the list!');

        //Clear input fields
        ui.clearInputFields();     
    }
    e.preventDefault();
});

//Delete meal from list
document.getElementById('meal-list').addEventListener('click', function(e){
    const ui = new UI;

    if (e.target.className === 'delete') {
        //remove from UI
        e.target.parentElement.remove();
        //remove from LS
        Store.removeLocalMeals(e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        ui.showAlert('success', 'Meals Removed!');
    } 
});