document.addEventListener("DOMContentLoaded", () => {
  displayTrackedClasses();
});

/**
 * Displays the classes that are currently being tracked by retrieving data from chrome.storage.
 */
function displayTrackedClasses() {
  chrome.storage.local.get(["classesList"], (result) => {
    const classesList = result.classesList || [];
    const classListTableBody = document.querySelector("#classList tbody");
    const noClassesDiv = document.getElementById("noClasses");

    // Clear any existing rows
    classListTableBody.innerHTML = "";

    if (classesList.length === 0) {
      noClassesDiv.style.display = "block";
      return;
    } else {
      noClassesDiv.style.display = "none";
    }

    classesList.forEach(classInfo => {
      const row = document.createElement("tr");

      const uniqueIdCell = document.createElement("td");
      uniqueIdCell.textContent = classInfo.uniqueId;
      row.appendChild(uniqueIdCell);

      const classNameCell = document.createElement("td");
      classNameCell.textContent = classInfo.className;
      row.appendChild(classNameCell);

      const statusCell = document.createElement("td");
      statusCell.textContent = classInfo.status;
      row.appendChild(statusCell);

      classListTableBody.appendChild(row);
    });
  });
}
