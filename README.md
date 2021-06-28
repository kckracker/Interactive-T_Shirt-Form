# Interactive-T_Shirt-Form
___
## Summary
___
An interactive form for illustrating t-shirt orders.
This project demonstrates the use of event listeners and DOM manipulation to provide the user with an interactive form display. 

The project can be summarized in a few steps:

  1. Onload Event. The onload event places focus in the name section to enable the user to begin typing in the form field immediately. In addition, there are elements hidden from view by default such as the Other Job Role input that are brought to view based on user selection.

  2. Event Listeners. The document contains event listeners on the Name, Email, Activity fieldset, Payments selection, and Credit Card inputs, for those selecting credit card payment. A submit listener is placed at the bottom of the script to test the validity of the input and prevent submission should input fail to meet defined parameters. Furthermore, additional 'keyup' listeners have been placed after each of the pertaining input fields to provide a real-time validation of user input on the Name, Email, Card Number, Zip Code, and CVV boxes.

  3. Error Messaging. I created a general validation function for successful input which returns a specific class to the parent of correct input as well as an equal and opposite function for failed validation. I built helper function to call the passing function upon a successful input and the failed function on a failed input. The helper functions for Email, Card Number, Zip Code, and CVV also provide hints based on the type of error received. If no user input is found, the hint will read something like "Please provide your information", whereas, if users submit data that does not meet the requirement of the regex parameter, the hint will notify them to submit data according to the valid parameter.

  4. Conflicting Schedules and Activity Costs. Using the value of the data-cost, I pushed the value of the data-cost to the DOM element supplying the initial value of $0.00 based on the user's selected activity. If the user deselects this activity, the value of that data-cost is deducted from the total and if additional activities are selected, their respective data-cost values are added. In addition, I have created a second event listener to log the value of the data-day-and-time both of the event target as well as the section itself in order to disable any activities conflicting with user selection. By comparing the data-day-and-time value of the event with the value of the looped section, I am able to use conditionals to disable any activity which matches data-day-and-time and is also not the current selection.

Cheers!
