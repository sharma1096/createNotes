// ----------------------BY code with harry____-------------------------

console.log("This is tutorial 22");
/*yha shownotes function ko ham is liye call kar rhe hai qki age koi page ko refresh v kar rha hai
toh vo v content hai localStorage me vo show ho jaye*/
let notes = localStorage.getItem("LSnotes");
if (notes == null) {
  document.getElementById("notes").innerHTML = "<h5>Content unavailable</h5>";
} else {
  showNotes();
}

// ------------------------------> Creating Content <------------------------------

//if user add notes add it to the local storage
// --> Selecting button to add event listner
let add_Btn = document.getElementById("addBtn");

// --> Adding event listner to selected button
add_Btn.addEventListener("click", function (e) {
  // --> Selecting textarea to extrect the content entered by user
  let text_Area = document.getElementById("textArea");
  /* --> now, user jo v content enter krega localStorage me ham 'LSnotes' key se save krenge
         ye 'LSnotes' jo hai vo local storage me ek array ko store kr rha hoga qki jitne v 
         content user add krega un sbb ka key LSnotes he hoga. toh local stoage me same key 
         ke nam se agl alg entry nhi create hoge blki ek hi entry hogi jiska key name LSnotes
         hoga or usse me as a arrya store hota jayega.*/
  let notes = localStorage.getItem("LSnotes");
  /* --> yha notesArray variable jo hai vo krega ye ki jo upr notes variable hai. isme basically
         hmare localstorage me jo entry create hoge LSnotes name se ye ek array fo content store
         krege lakin notes me ye array as string store ho jayega.
         to is string ko hi parse kar ke store krne ke liye ham notesArray bna rhe hai. ki is 
         array variable me string ko as a arrya store kr de.  */
  let notesArray = [];

  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  /* phle se jo localStorage me array content hai usse ham parse ke notesArray variable me store kr 
  diye hai.ab jo nya content user ne textarea me enter kiya hai usse notesArray ke last me push kr 
  denge.*/
  notesArray.push(text_Area.value);
  /* ab ham fir se jo hmara "LSnotes" entry hai localstorage me usse update kr denge as a string
  fir se store kr denge. */
  localStorage.setItem("LSnotes", JSON.stringify(notesArray));
  // yha fir se ham text_Area ko reset kar rhe hai
  text_Area.value = "";
  console.log(notesArray);
  // function show notes is basically for showing the notes which is in localStorage
  showNotes();
});

// ------------------------------> Showing Content <------------------------------

function showNotes() {
  let notes = localStorage.getItem("LSnotes");

  let notesArray = [];

  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }

  let html = "";

  notesArray.forEach(function (element, index) {
    html += `<div id="content_${index}" class="card mx-1 my-1" style="width: 17.9rem">
              <div class="card-body">
                <h5 class="card-title">note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <a id="${index}" onclick="deleteBtn(this.id)" class="btn btn-primary">Delete Note</a>
              </div>
            </div>`;
  });
  let showNoteTag = document.getElementById("notes");
  if (notes.length != 0) {
    showNoteTag.innerHTML = html;
  }
}

// ------------------------------> Deleting notes <------------------------------

function deleteBtn(index) {
  let notes = localStorage.getItem("LSnotes");
  let notesArray = JSON.parse(notes);
  // console.log(notesArray);
  let removed = notesArray.splice(index, 1);

  localStorage.setItem("LSnotes", JSON.stringify(notesArray));
  showNotes();
  if (notesArray.length == 0) {
    localStorage.removeItem("LSnotes");
    document.location.reload(true); //this is to reload the page
  }
}

//------------------------------> searching notes <------------------------------
let searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", function (e) {
  let inputVal = searchBox.value.toLowerCase();
  // console.log("Input event fired!", inputVal);

  let noteCards = document.getElementsByClassName("card");
  Array.from(noteCards).forEach(function (element) {
    console.log(element);
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
