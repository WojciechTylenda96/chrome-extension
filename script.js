import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase,
         ref, 
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://lead-tracker-app-bda66-default-rtdb.europe-west1.firebasedatabase.app/"
}

console.log

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

console.log(database)

// variables and constants
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

// functions
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    let snapshotDoesExist = snapshot.exists();
    if(snapshotDoesExist) {
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);
        render(leads);
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB ,inputEl.value)
    inputEl.value = ""
})