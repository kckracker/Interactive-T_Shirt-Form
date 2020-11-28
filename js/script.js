// Generating function to focus on name input, hide other roles, and hide shirt colors upon loading of page
window.onload = function nameFocus() {
    document.querySelector('#name').focus();
    document.querySelector('#other-job-role').style.display = 'none';
    document.querySelector('#shirt-colors').style.display = 'none';
}

