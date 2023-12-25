// Retrieve the list of unique IDs and their current status from localStorage
const storedIdsList = JSON.parse(localStorage.getItem('idsList'));

// Convert the stored array back to a Map
const idsList = new Map(storedIdsList);

// Display the list in the new tab
const classListContainer = document.getElementById('classList');

idsList.forEach(([uniqueId, status]) => {
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${uniqueId}, Status: ${status}`;
    classListContainer.appendChild(listItem);
});


