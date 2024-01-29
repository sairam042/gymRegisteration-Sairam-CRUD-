let submit = document.getElementById("submit");
let addressDiv;
const mainContainer = document.getElementById("mainContainer");

let userName = document.getElementById("name");
let userAge = document.getElementById("age");
let userLocation = document.getElementById("location");
let checkBox = document.getElementById("Require");

submit.addEventListener("click", createOrEdit);

function createOrEdit() {
    if (submit.textContent == "Create") {
        pickingData();
    } else {
        
        let checkBoxData;
        if (checkBox.checked) {
            checkBoxData = "Need-Trainer";
        } else {
            checkBoxData = "Trainer-not-required";
        }

        
        // Re-filling the Existing (mistake)Card.
        addressDiv.innerHTML = `
                    <h4>${userName.value}</h4>
                    <p>${userAge.value}</p>
                    <p>${userLocation.value}</p>
                    <p>${checkBoxData}</p>
                    <button class="deleteBtn">Delete</button>
                    <button class="editBtn">Edit</button> `;
        
        //Empty the detail boxes
        userName.value = "";
        userAge.value = "";
        userLocation.value = "";
        checkBox.checked = false;

        // Changing Submit-button Name into Create
        submit.innerHTML = "Create";


        //////////////////////////////////////////////////////////
        settingEventListeners(addressDiv);
        /////////////////////////////////////////////////////////////////


    }
}

function pickingData() {
    let arr = [];
    arr.push(userName.value);
    arr.push(userAge.value);
    arr.push(userLocation.value);
    if (checkBox.checked) {
        arr.push("Need-Trainer")
    } else {
        arr.push("Trainer-not-required");
    }

    console.log(arr);
    createCard(arr); // Invoking function to create details Card of Each client.

    //Empty the detail boxes
    userName.value = "";
    userAge.value = "";
    userLocation.value = "";
    checkBox.checked = false;
}


// dynamic Creation of cards 
function createCard(arr) {
    let card = document.createElement("div");
    card.className = "cards";
    card.innerHTML = `
                    <h4>${arr[0]}</h4>
                    <p>${arr[1]}</p>
                    <p>${arr[2]}</p>
                    <p>${arr[3]}</p>
                    <button class="deleteBtn">Delete</button>
                    <button class="editBtn">Edit</button> `;
    mainContainer.appendChild(card);


    settingEventListeners(card);
    console.log(card);

    // // Adding EventListner to DELETE Card
    // let deleting = card.querySelector(".deleteBtn");
    // deleting.addEventListener("click", deleteClickHandler);

    // function deleteClickHandler(event) {
    //     event.target.parentNode.remove();

    //     // // Removing EventListeners when Deleting a CARD
    //     // deleting.removeEventListener("click", arguments.callee);
    //     // editing.removeEventListener("click", editClickHandler);
}

function settingEventListeners(card) {
    // Adding EventListener to DELETE Card
    let deleting = card.querySelector(".deleteBtn");
    deleting.addEventListener("click", function(){
        deleteClickHandler(card);
    });

    function deleteClickHandler(event) {
        card.remove();
    }

    // Adding EventListner to Edit Card
    let editing = card.querySelector(".editBtn");
    editing.addEventListener("click",function(){
        editClickHandler(card);
    });

    function editClickHandler(event) {
        // get list of the particular cards innerHtml 
        userName.value = card.querySelector("h4").textContent;
        userAge.value = card.querySelectorAll("p")[0].textContent;
        userLocation.value = card.querySelectorAll("p")[1].textContent;
        checkBox.checked = card.querySelectorAll("p")[2].textContent === "Need-Trainer";
        addressDiv = card;
        //changing the innerHtml of Submit-button to (UPDATE)
        submit.innerHTML = "Update";

        // deleting.removeEventListener("click", deleteClickHandler);
        // editing.removeEventListener("click", editClickHandler);
      
    }

    function updateCard(card) {

        console.log(card);

        let checkBoxData;
        if (checkBox.checked) {
            checkBoxData = "Need-Trainer";
        } else {
            checkBoxData = "Trainer-not-required";
        }
        card.innerHTML="";
        // Update the existing card
        card.innerHTML = `
                        <h4>${userName.value}</h4>
                        <p>${userAge.value}</p>
                        <p>${userLocation.value}</p>
                        <p>${checkBoxData}</p>
                        <button class="deleteBtn">Delete</button>
                        <button class="editBtn">Edit</button> `;
        console.log(card.innerHTML);
        // Empty the detail boxes
        userName.value = "";
        userAge.value = "";
        userLocation.value = "";
        checkBox.checked = false;



         // Remove the event listener for update
         submit.removeEventListener("click",function(){
            updateCard(card);
        });

        // Changing Submit-button Name into Create
        submit.innerHTML = "Create";

       
        // Re-add the event listener for createOrEdit
        submit.addEventListener("click", createOrEdit);

        settingEventListeners(card);
    }
}



