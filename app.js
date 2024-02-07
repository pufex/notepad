let notes = [];
let flag = false;

const elementCreating = (element = "", classes = [], textInner = "") =>{
  element = document.createElement(element);
  classes.forEach((item) => {
    element.classList.add(item);
  })
  if(textInner !== "") element.innerText = "Delete this note";
  return;
}

const addNote = document.querySelector("#add-note");
const IconAddNote = addNote.querySelector(".icon");

addNote.addEventListener('click', () => {
  if(noteForm.classList.contains('hidden') != false) {
    noteForm.classList.toggle('hidden');
    IconAddNote.innerText = "⤻"
  } else{
    noteForm.classList.toggle('hidden');
    IconAddNote.innerText = "+"
  }
})

const notesContainer = document.querySelector(".notes")
const noteForm = document.querySelector("#note-form");
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
    id: notes.length,
    title: "",
    content: "",
  };
  
  userData.title = userTitle;
  userData.content = userContent;
  notes.push(userData);
  notesContainer.innerHTML = "";
  IconAddNote.innerHTML = "⤻";
  notes.forEach((note) => {
  
    const noteContainer = document.createElement('div');
    noteContainer.id = note.id;
    noteContainer.classList.add("container-item");
    noteContainer.classList.add("note-container");
  
    const noteTitle = elementCreating()
    noteTitle.classList.add("note-title");
    noteTitle.innerHTML = note.title;
    
    const noteButtons = document.createElement('div');
    noteButtons.classList.add("notes-controls", "note-controls");
    
    const noteDelete = document.createElement('div');
    noteDelete.classList.add("delete-note", "notes-control");
    noteButtons.append(noteDelete);

    const explanationDelete = document.createElement('span');
    explanationDelete.classList.add('explain');
    explanationDelete.innerText = "Delete this note";
    noteDelete.append(explanationDelete);

    const iconDelete = document.createElement('span');
    iconDelete.classList.add('icon');
    iconDelete.innerText = "🗑";
    noteDelete.append(iconDelete);

    if(flag == false) {
      noteDelete.classList.add("hidden");
    }

    noteDelete.addEventListener('click', (e) => {
      const filter = notes.filter((note) => note.id != noteContainer.id);
      notes = filter;
      console.log(notes);
      const ancestorContainer = e.target.closest('.note-container');
      ancestorContainer.remove();
    })
    
    
    const noteContent = document.createElement('div');
    noteContent.classList.add("note");
    noteContent.innerHTML = note.content;
    
    noteContainer.append(noteTitle, noteButtons, noteContent);
    notesContainer.append(noteContainer);
  })
})



const visibilityToggle = document.querySelector("#toggle-visibility");
console.log(visibilityToggle)


visibilityToggle.addEventListener('click', () => {
    const noteControls = document.querySelectorAll(".note-controls");
    console.log(noteControls);
    noteControls.forEach(item => {
      if(item.classList.contains("hidden") == false) flag = true;
      item.classList.toggle('hidden');
    })
})