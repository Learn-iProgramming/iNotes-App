// When page reload all text show here(In DOM)
displayNote();

// If user adds a note, add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", (e) => {
    let addNote = document.getElementById("addNote");
    let addTitle = document.getElementById("addTitle");
    
    // If in localStorage is already having any notes then its show this text
    let text = localStorage.getItem("text");
    // If text are not here So
    if (text == null) {
        textObj = [];
    }
    else {
        textObj = JSON.parse(text);
    }

    // text added in localStorage
    let myObj = {
        title: addTitle.value,
        text: addNote.value
    }
    textObj.push(myObj);
    localStorage.setItem("text", JSON.stringify(textObj));
    // When added our text then blank textarea
    addNote.value = "";
    // When added our text then blank title
    addTitle.value = "";
    displayNote();
});

// Function to show elements from localstorage
function displayNote() {
    let text = localStorage.getItem("text");
    if (text == null) {
        textObj = [];
    }
    else {
        textObj = JSON.parse(text);
    }

    // Blank string makes
    let html = " ";
    textObj.forEach((element, index) =>{
        html += `
        <div class="noteCard my-2 mx-2 card border-secondary" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
    });

    // text added in DOM
    let showMsg = document.getElementById('text');
    if (textObj.length != 0) {
        showMsg.innerHTML = html;
    }
    else {
        showMsg.innerHTML = `Not added notes here, So add your imp notes here!`;
    }

}

// Function to delete note
function deleteNote(index) {

    let text = localStorage.getItem("text");
    if (text == null) {
        textObj = [];
    }
    else {
        textObj = JSON.parse(text);
    }

    textObj.splice(index, 1);
    // When you want to delete note so firsly update localstorage
    localStorage.setItem("text", JSON.stringify(textObj));
    // Call displytext
    displayNote();
}

// Search text
if (document.getElementById('searchTxt') != null){
let search = document.getElementById('searchTxt').value;
search.addEventListener("input", function(){
    
    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});
}