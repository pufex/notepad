let notes = [], stringKey =  "notes";

const getNotesFromLocal = () =>{
  let array = [];
  if(localStorage.getItem(stringKey) != null){
    return JSON.parse(localStorage.getItem(stringKey))
  } else [];
}

const saveNotesToLocal = (array = []) => {
  localStorage.setItem(stringKey, JSON.stringify(array));
}

const elementCreating = (element, class1, class2, text) => {
  element = document.createElement(element);
  element.classList.add(class1, class2);
  if(text !== "") element.innerText = text;
  return element;
}

const renderWelcomeMessage = (array = []) =>{
  const notes = document.querySelector(".notes");
  if(array.length == 0){
    const paragraphs = [
      elementCreating("p", "text-paragraph", "x", "Here is the place for the notes you're gonna make in the future."),
      elementCreating("p", "text-paragraph", "x", "To add a note simply use the button with the '+' inside. To toggle the notes' options, press the one with the red '👁' button. To toggle darkmode press the blue '☼'."),
      elementCreating("p", "text-paragraph", "x", "If you're viewing this site on a mobile device, click on the '≣' icon to open a menu with the controls mentioned earlier."),
      elementCreating("p", "text-paragraph", "text-paragraph--last", "                This text will disappear as soon as you make your first note. Have fun!"),
    ]
    paragraphs.forEach((item) => {
      notes.append(item);
    })
  }
}

notes = getNotesFromLocal();
console.log(notes.length)
renderWelcomeMessage(notes);

let flag = false;


const renderNotes = () => {
  notesContainer.innerHTML = "";
  notes.sort((a, b) => a - b);
  notes.forEach((note, index) => {
  
    const noteContainer = elementCreating("div", "container-item", "note-container", "");
    noteContainer.id = index;
    noteContainer.setAttribute("id", index);
  
    const noteTitle = elementCreating("h1", "note-title", "x", note.title);

    const noteNumber = elementCreating("h3", "note-number", "x", `#${index+1}`);
    
    const noteButtons = elementCreating("div", "notes-controls", "note-controls", "");
    
    const noteDelete = elementCreating("div", "delete-note", "notes-control", "");
    noteButtons.append(noteDelete);

    const explanationDelete = elementCreating("span", "explain", "x", "")
    noteDelete.append(explanationDelete);

    const explanationDeleteText = elementCreating("span", "explain-text", "x", "Delete this note")
    let explanationTriangle = elementCreating("span", "explain-triangle", "x", "")
    console.log(explanationTriangle);

    explanationDelete.append(explanationTriangle, explanationDeleteText);

    const iconDelete = elementCreating("span", "icon", "x", "🗑");
    noteDelete.append(iconDelete);

    noteDelete.addEventListener('click', (e) => {
      const filteredValue = notes.filter((note, i) => i == noteContainer.id);
      notes = notes.filter((note, i) => i != noteContainer.id);
      saveNotesToLocal(notes);
      console.log(notes)
      console.log(localStorage);
      renderNotes();
      const ancestorContainer = e.target.closest('.note-container');
      ancestorContainer.remove();
    })
    
    const noteEdit = elementCreating("div", "edit-note", "notes-control", "");
    noteButtons.append(noteEdit);

    const explanationEdit = elementCreating("span", "explain", "x", "")
    noteEdit.append(explanationEdit);
    const explanationEditText = elementCreating("span", "explain-text", "x", "Edit this note")
    explanationEdit.append(explanationTriangle, explanationEditText);

    const iconEdit = elementCreating("span", "icon", "x", "✎");
    noteEdit.append(iconEdit);


    iconEdit.addEventListener('click', (e1) => {
      const objectNote = notes.find((note , i) => i == noteContainer.id);

      const body = document.querySelector("body");

      const window = elementCreating("div", "edit-window", "x", "");

      
      const container = elementCreating("div", "edit-container", "x", "");
      window.append(container)
      
      const title = elementCreating("h1", "edit-title", "x", "Edit note " + (i + 1));
      container.append(title);

      const inputTitle = elementCreating("input", "edit-input", "x", "");
      inputTitle.value = objectNote.title;  
      container.append(inputTitle);
      
      const inputContent = elementCreating("input", "edit-input", "x", "")
      inputContent.value = objectNote.content;  
      container.append(inputContent);
      
      const update = elementCreating("div", "update", "x", "Update your note");
      container.append(update);

      body.append(window);
      
      update.addEventListener('click', (e) => {
        notes[index].title = inputTitle.value;
        notes[index].content = inputContent.value;
        console.log(notes);
        saveNotesToLocal(notes);
        renderNotes();
        window.remove();
      })
    })

    const noteContent = elementCreating("div", "note", "x", note.content);

    
    noteContainer.append(noteTitle, noteNumber, noteContent, noteButtons);
    notesContainer.append(noteContainer);
  })
}

const notesContainer = document.querySelector(".notes")
renderNotes();

const noteForm = document.querySelector("#note-form");
const addNote = document.querySelectorAll(".add-note");

addNote.forEach((item) => {
  item.addEventListener('click', () => {
    const IconAddNote = item.querySelector(".icon");
    if(noteForm.classList.contains('hidden') != false) {
      noteForm.classList.remove('hidden');
      IconAddNote.innerText = "⤻"
    } else{
      noteForm.classList.add('hidden');
      IconAddNote.innerText = "+"
    }
  })
})


const formErrorLabel = document.querySelector(".note-form--error");


let userTitle, userContent;

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  userTitle = event.target[0].value;
  userContent = event.target[1].value;
  if(userTitle == "" || userContent == ""){
    formErrorLabel.innerText = "Data wasn't entered"
    return;
  }
  noteForm.classList.toggle('hidden');
  let userData = {
    id: notes.length-1,
    title: "",
    content: "",
  };
  
  userData.title = userTitle;
  userData.content = userContent;
  notes.push(userData);
  saveNotesToLocal(notes);
  // IconAddNote.innerHTML = "+";
  renderNotes();
})



const visibilityToggles = document.querySelectorAll(".toggle-visibility");

visibilityToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    let noteControls = document.querySelectorAll(".note-controls");
    noteControls.forEach((item) => {
      if(item.classList.contains("hidden") == false) flag = true;
      item.classList.toggle('hidden');
    })
  })
})


const darkmodeToggles = document.querySelectorAll(".dark-mode")

let i=0, color = [
  ["#ECEDE8", "#000000"],
  ["#D6D6D6", "#272727"],
  ["#5C5C5C", "#d3d3d3"],
  ["#000000", "#ffffff"],
  ["#0000ff", "#00bbf0"],
  ["#2323ff", "#04c9ff"]
]

darkmodeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    i++;
    toggle.classList.toggle("dark-mode--active");
    document.documentElement.style.setProperty('--main-color', color[0][i%2]);
    document.documentElement.style.setProperty('--second-color', color[1][i%2]);
    document.documentElement.style.setProperty('--third-color', color[2][i%2]);
    document.documentElement.style.setProperty('--fourth-color', color[3][i%2]);
    document.documentElement.style.setProperty('--footer-link', color[4][i%2]);
    document.documentElement.style.setProperty('--footer-link-hover', color[5][i%2]);
  })
})


const hamburger = document.querySelector(".hamburger");
const hamburgerList = document.querySelector(".hamburger-container");

hamburger.addEventListener("click", () => {
  hamburgerList.classList.toggle("hidden");
})

