//Authors Md Rahman & El-Shinawy 
//current changes needed:   

class ClassInfo {
    constructor(uniqueId, className, status = "Unknown") {
        this.uniqueId = uniqueId;
        this.className = className;
        this.status = status;
    }
}

let uniqueId;
const classList = new Map(); // Map of uniqueId to ClassInfo objects
const limit = 20;
const RATE_LIMIT_DELAY = 2000; // 2 seconds delay to avoid overwhelming the server

// Utility function to simulate fetching class name based on uniqueId
function getClassName(uniqueId) {
    // Placeholder function: Replace with actual logic to fetch class name
    const classNames = {
        "12345": "Introduction to Programming",
        "23456": "Data Structures",
        "34567": "Algorithms",
        // Add more mappings as needed
    };
    return classNames[uniqueId] || "Unknown Class";
}

// Allow adding of specific courses MUST BE 5 DIGIT
document.getElementById("addButton").onclick = function () {
    uniqueId = document.getElementById("input").value.trim();
    if (uniqueId.length !== 5) {
        uniqueId = "";
        console.error("Error: Unique ID was not entered correctly, or does not exist");
        displayMessage("Error: ID not found", false);
    } else if (classList.size >= limit) {
        displayMessage("Limit Reached", false);
    } else if (classList.has(uniqueId)) {
        displayMessage("Class already being tracked", false);
    } else {
        addClass(uniqueId);
    }
};

// Allow removal of specific courses MUST BE 5 DIGIT
document.getElementById("removeButton").onclick = function () {
    uniqueId = document.getElementById("input").value.trim();
    if (uniqueId.length !== 5 || !classList.has(uniqueId)) {
        uniqueId = "";
        console.error("Error: Unique ID was not entered correctly, or does not exist");
        displayMessage("Error: ID not found", false);
    } else {
        classList.delete(uniqueId);
        saveToLocalStorage();
        displayMessage("Class removed successfully!", true);
    }
};

// Display message in the label box
function displayMessage(message, isSuccess) {
    const label = document.getElementById("label");
    label.innerHTML = message;
    label.classList.remove("success", "error");
    label.classList.add(isSuccess ? "success" : "error");
}

// Allow viewing the current list of tracked classes
document.getElementById("currentList").onclick = function () {
    saveToLocalStorage();
    window.open("list.html", "_blank", "width=600,height=400");
};

// Function to add class ID
function addClass(uniqueId) {
    // Rate limiting to avoid overwhelming servers
    setTimeout(() => {
        const className = getClassName(uniqueId); // Fetch class name based on uniqueId
        const classInfo = new ClassInfo(uniqueId, className);
        classList.set(uniqueId, classInfo);
        saveToLocalStorage();
        displayMessage("Class added successfully!", true);
        fetchClassStatus(uniqueId); // Call the function to get class status
    }, RATE_LIMIT_DELAY);
}

// Function to fetch class status after the user is logged in
function fetchClassStatus(classId) {
    console.log(`Fetching status for class ID: ${classId}`);
    // Simulate fetching status
    setTimeout(() => {
        const classInfo = classList.get(classId);
        if (classInfo) {
            classInfo.status = "Open"; // Example status; Will replace with actual fetch logic
            classList.set(classId, classInfo);
            saveToLocalStorage();
            console.log(`Status for class ID ${classId} updated to ${classInfo.status}`);
        }
    }, RATE_LIMIT_DELAY);
}

// Function to save the class list to localStorage
function saveToLocalStorage() {
    const classesArray = Array.from(classList.values());
    localStorage.setItem('classesList', JSON.stringify(classesArray));
}

// Initialize classList from localStorage if available
function initializeClassList() {
    const storedClasses = JSON.parse(localStorage.getItem('classesList'));
    if (storedClasses && Array.isArray(storedClasses)) {
        storedClasses.forEach(classInfo => {
            classList.set(classInfo.uniqueId, classInfo);
        });
    }
}

// Initialize on page load
initializeClassList();















// let uniqueId;
// let currentStatus = "Unknown";
// const ids = new Map();
// const limit = 20;
// const RATE_LIMIT_DELAY = 2000; // 2 seconds delay to avoid overwhelming the server

// //allow adding of specific courses MUST BE 5 DIGIT
// document.getElementById("addButton").onclick = function () {
//     uniqueId = document.getElementById("input").value;
//     if (uniqueId.length !== 5) {
//         uniqueId = "";
//         console.error("Error: Unique ID was not entered correctly, or does not exist");
//         document.getElementById("label").innerHTML = "Error: ID not found";
//         document.getElementById("label").classList.remove("success");
//         document.getElementById("label").classList.add("error");
//     } else if (ids.size >= limit) {
//         document.getElementById("label").innerHTML = "Limit Reached";
//         document.getElementById("label").classList.remove("success");
//         document.getElementById("label").classList.add("error");
//     } else {
//         addClass(uniqueId);
//     }
// };

// //allow removal of specific courses MUST BE 5 DIGIT
// document.getElementById("removeButton").onclick = function () {
//     uniqueId = document.getElementById("input").value;
//     if (uniqueId.length !== 5 || !ids.has(uniqueId)) {
//         uniqueId = "";
//         console.error("Error: Unique ID was not entered correctly, or does not exist");
//         document.getElementById("label").innerHTML = "Error: ID not found";
//         document.getElementById("label").classList.remove("success");
//         document.getElementById("label").classList.add("error");
//     } else {
//         console.log("Unique ID was found");
//         document.getElementById("label").innerHTML = "Success!";
//         document.getElementById("label").classList.remove("error");
//         document.getElementById("label").classList.add("success");
//         ids.delete(uniqueId);
//     }
// };

// //turn list into arrays
// document.getElementById("currentList").onclick = function () {
//     localStorage.setItem('idsList', JSON.stringify(Array.from(ids)));
//     window.open("list.html", "_blank", "width=600,height=400");
// };

// // Function to add class ID
// function addClass(uniqueId) {
//     // Rate limiting to avoid overwhelming servers
//     setTimeout(() => {
//         console.log("Unique ID was found");
//         document.getElementById("label").innerHTML = "Success!";
//         document.getElementById("label").classList.remove("error");
//         document.getElementById("label").classList.add("success");
//         ids.set(uniqueId, currentStatus);
//         fetchClassStatus(uniqueId); // Call the function to get class status
//     }, RATE_LIMIT_DELAY);
// }

// // Function to fetch class status after the user is logged in
// function fetchClassStatus(classId) {
//     // Assuming the user is logged in, interact with the webpage to get the class status
//     // This part would involve querying the already authenticated page for data
//     console.log(`Fetching status for class ID: ${classId}`);
//     // You would add the logic to extract data here, for now we can simulate with:
//     currentStatus = "Open"; // Example, ideally you'd extract this from the UT webpage
//     ids.set(classId, currentStatus);
// }
