// Retrieve the list of unique IDs and their current status from the main page
const idsList = window.opener.idsList;

// Display the list in the new tab
const classListContainer = document.getElementById('classList');

idsList.forEach(([uniqueId, status]) => {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${uniqueId}, Status: ${status}`;
    classListContainer.appendChild(listItem);
});

