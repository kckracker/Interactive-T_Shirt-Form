// ---- GLOBAL VARIABLES ---- 
// Storing variable for activity costs outside Event Listener
let activityTotal = 0;
const activitiesBox = document.querySelector('#activities-box');
const paymentMethods = document.querySelectorAll('.payment-methods>div');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const colors = document.querySelector('#color');
const shirts = document.querySelector('#design');
const activityBox = document.querySelectorAll('#activities-box input');
const totalCost = document.querySelector('#activities-cost');
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
});


// Creating Event Listener for activities fieldset to detect changes on the checkboxes
document.querySelector('#activities').addEventListener('input', (e) => {
    // Storing target of click in variable
    let clicked = e.target;
    // Looping through activity box to get information on each listing
    for (let i = 0; i < activityBox.length; i++) {
        let activityTime = activityBox[i].getAttribute('data-day-and-time');
        // Storing cost value of each activity and converting to number for addition to total cost 
        let activityCost = parseInt(activityBox[i].getAttribute('data-cost'));
        if (clicked.checked === true && clicked === activityBox[i]) {
            activityTotal += activityCost;
            totalCost.textContent = `Total: $${activityTotal}`;
        }
        //  supplying else if to deduct amount if activity is deselected
        else if (clicked.checked === false && clicked === activityBox[i]){
            activityTotal -= activityCost;
            totalCost.textContent = `Total: $${activityTotal}`;
        }
    } 
})


// adding focus class on checkboxes when focus received to improve display. Gathered focusin detail at https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event
activitiesBox.addEventListener('focusin', (e) => {
    let labelActivity = e.target.parentNode;
    labelActivity.classList.add('focus');
})
// removing focus display once focus has shifted from textbox. Gathered focusout detail at https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
activitiesBox.addEventListener('focusout', (e) => {
    let activityLabel = document.querySelector('label.focus');
    activityLabel.classList.remove('focus');
})

//  creating event listener to test the value of the "data-day-and-time" attribute of the selected against any conflicting activities other than itself
activitiesBox.addEventListener('click', (e) => {
    let clicked = e.target;
    let clickedTime = e.target.getAttribute('data-day-and-time');
    // storing all input boxes in activities-box section to loop through for details on cost
    const activityBox = document.querySelectorAll('#activities-box input');
    // looping through activity box to get information on each listing - specifically to gain the "data-day-and-time" value
    for (let i = 0; i < activityBox.length; i++) {
        let activityTime = activityBox[i].getAttribute('data-day-and-time');
        if (clicked.checked === true && activityTime === clickedTime && clicked !== activityBox[i]) {
            activityBox[i].disabled = true;
            activityBox[i].parentElement.classList.add('disabled');
        } 
        else if (clicked.checked === false && activityTime === clickedTime && clicked !== activityBox[i]) {
            activityBox[i].disabled = false;
            activityBox[i].parentElement.classList.remove('disabled');
        }
    }
});


// adding Event Listener to payments section to only display the content associated with the chosen payment method
document.querySelector('#payment').addEventListener('change', (e) => {
    let chosenMethod = e.target.value;
    for (let i = 0; i < paymentMethods.length; i++) {      
        if ( chosenMethod === paymentMethods[i].id ) {
            paymentMethods[i].style.display = 'block';
        } else if (paymentMethods[i].id !== chosenMethod ) {
            paymentMethods[i].style.display = 'none';
            document.querySelector('.payment-method-box').style.display = 'block';
        }
    }
})
// creating validation function to assign classes to parent element and last child element based on successful parameters
const validationSuccess = (element) => {
    let parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none';
}
// creating validation function to assign classes to parent element and last child element based on failed parameters
const validationFail = (element) => {
    let parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = 'block';
}

//  function helper to test Name input - if field isn't blank ''
const nameTest = () => {
    const nameIsValid = /^[\w]+$/.test(nameInput.value);
    if (nameIsValid) {
        validationSuccess(nameInput);
    } else {
        validationFail(nameInput);
    }
    return nameIsValid;
}
// adding eventListener to test condition of successful entry based on "keyup" event
nameInput.addEventListener('keyup', () => {
    nameTest();
})

//  function helper to test Email input - if field is not blank OR if field meets proper formatting defined in regex string
const emailTest = () => {
    const emailIsValid = /^[^@]+@[^@]+\.[\w]{3}$/.test(emailInput.value); 
     if (emailInput.value === ''){
        validationFail(emailInput);
        emailInput.parentElement.lastElementChild.textContent = 'Please provide your email.'
    } else if (emailIsValid) {
        validationSuccess(emailInput);
    }  
    else {
        validationFail(emailInput);
        emailInput.parentElement.lastElementChild.textContent = 'Email address must be formatted correctly.'
    }
    return emailIsValid;
}
// adding eventListener to test condition of successful entry based on "keyup" event
emailInput.addEventListener('keyup', () => {
    emailTest();
})


//  function helper to test Activity input - verifying at least 1 checkbox has been selected
const activityTest = () => {
    let activityIsValid = activityTotal > 0;
    if (activityIsValid) {
        validationSuccess(activitiesBox);
    } else {
        validationFail(activitiesBox);
    }
    return activityIsValid;
}


//  function helper to test Credit Card Number input - if field is not blank OR if field meets proper formatting defined in regex string
const cardNumberTest = () => {
    const cardNumberIsValid = /^(\d{13}|\d{16})$/.test(cardNumber.value);
    if (cardNumber.value === ''){
        validationFail(cardNumber);
        cardNumber.parentElement.lastElementChild.textContent = 'Please provide your credit card number.'
    } else if (cardNumberIsValid) {
        validationSuccess(cardNumber);
    }  
    else {
        validationFail(emailInput);
        cardNumber.parentElement.lastElementChild.textContent = 'Credit card number must be between 13 - 16 digits.'
    }
    return cardNumberIsValid;
}
// adding eventListener to test condition of successful entry based on "keyup" event
cardNumber.addEventListener('keyup', () => {
    cardNumberTest();
})


//  function helper to test Credit Card Number input - if field is not blank OR if field meets proper formatting defined in regex string
const zipTest = () => {
    const zipIsValid = /^\d{5}$/.test(zipInput.value);
   if (zipInput.value === '') {
        validationFail(zipInput);
        zipInput.parentElement.lastElementChild.textContent = 'Please provide your Zip Code.'
   }
    else if (zipIsValid) {
        validationSuccess(zipInput);
    } else {
        validationFail(zipInput);
        zipInput.parentElement.lastElementChild.textContent = 'Zip Code must be 5 digits.'
    }
    return zipIsValid;
}
// adding eventListener to test condition of successful entry based on "keyup" event
zipInput.addEventListener('keyup', () => {
    zipTest();
})


//  function helper to test Credit Card Number input - if field is not blank OR if field meets proper formatting defined in regex string
const cvvTest = () => {
    const cvvIsValid = /^\d{3}$/.test(cvvInput.value);
    if (cvvInput.value === '') {
        validationFail(cvvInput);
        cvvInput.parentElement.lastElementChild.textContent = 'Please provide your CVV Number.'
    }
    else if (cvvIsValid) {
        validationSuccess(cvvInput);
    } else {
        validationFail(cvvInput);
        cvvInput.parentElement.lastElementChild.textContent = 'CVV must be 3 digits.'
    }
    return cvvIsValid;
}
// adding eventListener to test condition of successful entry based on "keyup" event
cvvInput.addEventListener('keyup', () => {
    cvvTest();
})


// Place listener on form to listen for "submit"
document.querySelector('form').addEventListener('submit', (e) => {
    /*  defining initial parameters for validation on "Credit Card" payment selection as additional fields will be required.
        a failure of any of the parameters will add hint classes and prevent submission of form.
    */
    if (document.querySelector('option[value="credit-card"]').selected === true){
        if (!nameTest()){
            e.preventDefault();
        }
        if (!emailTest()){
            e.preventDefault();
        }
        if (!activityTest()){
            e.preventDefault();
        }
        if (!cardNumberTest()){
            e.preventDefault();
        }
        if (!zipTest()){
            e.preventDefault();
        }
        if (!cvvTest()){
            e.preventDefault();
        }
    } 
    //  defining parameters for any other payment method as the Name, Email, and Activity parameters are still required
    else if (document.querySelector('option[value="credit-card"]').selected === false) {
        if (!nameTest()){
            console.log("Invalid Name!");
            e.preventDefault();
        }
        if (!emailTest()){
            console.log("Invalid Email!");
            e.preventDefault();
        }
        if (!activityTest()){
            console.log("Invalid Activity Selection!");
            e.preventDefault();
        }  
    } 
})
