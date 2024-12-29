//index.js
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
const RATE_LIMIT_DELAY = 2000; // 2 seconds delay

// Fetch or simulate fetching class name based on uniqueId
function getClassName(uniqueId) {
  const classNames = {
    "12345": "Introduction to Programming",
    "23456": "Data Structures",
    "34567": "Algorithms"
    // ... more if needed
  };
  return classNames[uniqueId] || "Unknown Class";
}

// Initialize stored classes from chrome.storage
initializeClassListFromStorage();

// ADD Button
document.getElementById("addButton").onclick = function () {
  uniqueId = document.getElementById("input").value.trim();
  if (uniqueId.length !== 5) {
    displayMessage("Error: ID must be exactly 5 digits", false);
  } else if (classList.size >= limit) {
    displayMessage("Error: 20 class limit reached", false);
  } else if (classList.has(uniqueId)) {
    displayMessage("Error: Class already being tracked", false);
  } else {
    addClass(uniqueId);
  }
};

// REMOVE Button
document.getElementById("removeButton").onclick = function () {
  uniqueId = document.getElementById("input").value.trim();
  if (uniqueId.length !== 5 || !classList.has(uniqueId)) {
    displayMessage("Error: ID not found or invalid", false);
  } else {
    classList.delete(uniqueId);
    saveToStorage();
    displayMessage("Class removed successfully!", true);
  }
};

// SHOW CURRENT LIST
document.getElementById("currentList").onclick = function () {
  saveToStorage();
  // Open list.html in a new tab
  chrome.tabs.create({ url: chrome.runtime.getURL("list.html") });
};

// UPDATE ALL CLASSES (scraping after user logs in)
document.getElementById("updateStatusButton").onclick = function () {
  // Open the UT Registrar site in a new tab
  chrome.tabs.create({ url: "https://utdirect.utexas.edu/apps/registrar/course_schedule/20252/" }, function (tab) {
    // Wait the RATE_LIMIT_DELAY, then inject contentScript to scrape
    setTimeout(() => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["contentScript.js"]
        },
        () => {
          console.log("Content script injected for scraping.");
        }
      );
    }, RATE_LIMIT_DELAY);
  });
};

/**
 * Function to add a class.
 * If everything is OK, we show a success message in green.
 */
function addClass(id) {
  setTimeout(() => {
    const className = getClassName(id);
    const classInfo = new ClassInfo(id, className);
    classList.set(id, classInfo);
    saveToStorage();
    displayMessage("Class added successfully!", true);
  }, RATE_LIMIT_DELAY);
}

/**
 * Displays a success (green) or error (red) message under the input box.
 * @param {string} message - Text to display
 * @param {boolean} isSuccess - True for success (green), false for error (red)
 */
function displayMessage(message, isSuccess) {
  const label = document.getElementById("label");
  label.innerHTML = message;
  // Remove any existing success/error class, then add appropriate one
  label.classList.remove("success", "error");
  label.classList.add(isSuccess ? "success" : "error");
}

// Save the classList to chrome.storage
function saveToStorage() {
  const classesArray = Array.from(classList.values());
  chrome.storage.local.set({ classesList: classesArray }, () => {
    console.log("Class list saved to storage", classesArray);
  });
}

// Load any previously stored classes from chrome.storage
function initializeClassListFromStorage() {
  chrome.storage.local.get(["classesList"], (result) => {
    const storedClasses = result.classesList || [];
    if (storedClasses.length > 0) {
      storedClasses.forEach((classInfo) => {
        classList.set(classInfo.uniqueId, classInfo);
      });
    }
  });
}
