// ---- GLOBAL VARIABLES ---- 
// Storing variable for activity costs outside Event Listener
let activityTotal = 0;
const activitiesBox = document.querySelector('#activities-box');
const paymentMethods = document.querySelectorAll('.payment-methods>div');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const colors = document.querySelector('#color');
const shirts = document.querySelector('#design');
const cardNumber = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

// ---- ONLOAD EVENT ----
// Generating function to focus on name input, hide other roles, and hide shirt colors upon loading of page
window.onload = function pageLoad () {
    document.querySelector('#name').focus();
    document.querySelector('#other-job-role').style.display = 'none';
    document.querySelector('#shirt-colors').style.display = 'none';
    document.querySelector('#paypal' ).style.display = 'none';
    document.querySelector('#bitcoin' ).style.display = 'none';
    document.querySelector('option[value="credit-card"]').selected = true;
}


// Setting an event listener on the Select list
document.querySelector('#title').addEventListener('change', (e) => {
    // Conditional statement to check if selection value equals "other"
    if (e.target.value === "other"){
        // Displaying other job role input upon Other selection, else hiding from view
    document.querySelector('#other-job-role').style.display = 'block';
    } else {
        document.querySelector('#other-job-role').style.display = 'none';    
    }
});

// Creating event listener on Shirt Designs element for any changes
document.querySelector('#shirt-designs').addEventListener('change', (e) => {
    document.querySelector('#shirt-colors').style.display = 'block';
    //  Looping through color attribute "data-theme" to match against targeted shirt value. Displaying colors matching selection, else hiding from view.
    for (let i = 0; i < colors.length; i++) {
        if (colors[i].getAttribute('data-theme') !==  e.target.value ) {
            colors[i].hidden = true;
        } else {
            colors[i].hidden = false;
        }
    }
