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
   // window.location.href = 'https://utdirect.utexas.edu/apps/registrar/course_schedule/20242/';
});

// necessary libraries
const { Builder, By, Key, until} = require("selenium-webdriver");
require("chromedriver");

async function test_case() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("https://utdirect.utexas.edu/apps/registrar/course_schedule/20242/");

        // Wait for the "unique_number" element to be present for a maximum of 40 seconds
        await driver.wait(until.elementLocated(By.name("unique_number")), 40000);

        // Once the element is present, send keys
        await driver.findElement(By.name("unique_number")).sendKeys("12345", Key.RETURN);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Run the Selenium WebDriver code
test_case();
