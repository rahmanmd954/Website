//Authors Md Rahman & El-Shinawy 
//current changes needed:   
/* 
  have to find a way to scrape UT registration to get the status of the class 

  Mailto function in order to send notifications if user turns notification on 

  create second page where all the classes being tracked are displayed
*/
let uniqueId;
let currentStatus = "Unknown";
const ids = new Map();
const puppeteer = require('puppeteer');
//number of notifications the user can have active at once
const limit = 20;
//function upon user click of add button
document.getElementById("addButton").onclick = function () {
    uniqueId = document.getElementById("input").value;
    if (uniqueId.length != 6) {
        uniqueId = "";
        console.log("Error: Unique is was not entered correctly, or does not exist");
        document.getElementById("label").innerHTML = "Error Id not found";
        document.getElementById("label").classList.remove("success");
        document.getElementById("label").classList.add("error");
    } else if (ids.size >= limit) {
        document.getElementById("label").innerHTML = "Limit Reached";
        document.getElementById("label").classList.remove("success");
        document.getElementById("label").classList.add("error");
    } else {
        console.log("Unique Id was found");
        document.getElementById("label").innerHTML = "Success!";
        document.getElementById("label").classList.remove("error");
        document.getElementById("label").classList.add("success");
        ids.set(uniqueId, currentStatus);
    }
}

//function upon user click of remove button
document.getElementById("removeButton").onclick = function () {
    uniqueId = document.getElementById("input").value;
    if (uniqueId.length != 6 || !ids.has(uniqueId)) {
        uniqueId = "";
        console.log("Error: Unique is was not entered correctly, or does not exist");
        document.getElementById("label").innerHTML = "Error Id not found";
        document.getElementById("label").classList.remove("success");
        document.getElementById("label").classList.add("error");
    } else {
        console.log("Unique Id was found");
        document.getElementById("label").innerHTML = "Success!";
        document.getElementById("label").classList.remove("error");
        document.getElementById("label").classList.add("success");
        ids.delete(uniqueId);
    }
}

document.getElementById("currentList").onclick = function () {
    // Store the ids Map in localStorage
    localStorage.setItem('idsList', JSON.stringify(Array.from(ids)));

    // Open a new tab with the list.html file
    const listPage = window.open("list.html", "_blank", "width=600,height=400");
}

async function scrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // change what is in parentheses to Xpath we are scraping
    const [el] = await page.$x('//*[@id="search_area"]/div[2]/div[2]/form/div[2]/label')
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();
}

//link to ut registration page
scrape('https://utdirect.utexas.edu/apps/registrar/course_schedule/20242/');