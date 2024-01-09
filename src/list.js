// Retrieve the list of unique IDs and their current status from localStorage
const storedIdsList = JSON.parse(localStorage.getItem('idsList'));

// Convert the stored array back to a Map
const idsList = new Map(storedIdsList);

// Display the list in the new tab
const classListContainer = document.getElementById('classList');
//const { Builder, By, Key, until } = require('selenium-webdriver');

idsList.forEach(([uniqueId, status]) => {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${uniqueId}, Status: ${status}`;
    classListContainer.appendChild(listItem);

    // // redirect the user to the UT log On page
    window.location.href = 'https://utdirect.utexas.edu/apps/registrar/course_schedule/20242/';
});