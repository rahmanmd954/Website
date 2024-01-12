// Redirect the user to the UTexas link
window.location.href = 'https://utdirect.utexas.edu/apps/registrar/course_schedule/20242/';

// Wait for the "unique_number" element to be present for a maximum of 60 seconds
const waitForElement = async () => {
    const uniqueNumberElement = document.getElementsByName('unique_number')[0];
    if (uniqueNumberElement) {
        // Once the element is present, send keys
        uniqueNumberElement.value = '12345';
        uniqueNumberElement.form.submit();
    } else {
        // Retry after a short delay
        setTimeout(waitForElement, 1000);
    }
};

// Call the function to wait for the element
waitForElement();

// Function to wait for a specific element on the target website
const waitForLoggedIn = async () => {
    const loggedInElement = document.getElementById('unique_nuqmber_header'); // Replace with the actual ID or selector
    if (loggedInElement) {
        // Continue with the scraping or any other actions
        console.log('User is logged in!');
    } else {
        // Retry after a short delay
        setTimeout(waitForLoggedIn, 1000);
    }
};

// Call the function to wait for the user to log in
waitForLoggedIn();
