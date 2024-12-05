// variables and constants
let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// functions
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value =""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
    console.log(localStorage.getItem("myLeads"))
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTabUrl = tabs[0].url;  // Pobieranie URL aktywnej karty
        myLeads.push(currentTabUrl);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);  // Aktualizacja wyświetlanej listy
    });
})

function render(leads) {
    let listItems = ""
    for (i = 0; i < leads.length; i++) {
        listItems += `
            <li id="li-el">
                <a id="a-el" href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems;
}

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
