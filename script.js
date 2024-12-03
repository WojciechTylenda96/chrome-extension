
// variables and constants
let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    renderLeads();
})

function renderLeads() {
    let listItems = ""
    for (i = 0; i < myLeads.length; i++) {
        listItems += `
            <li id="li-el">
                <a id="a-el" href="${myLeads[i]}" target="_blank">
                    ${myLeads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems;
}



