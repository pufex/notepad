let notes = [];
let flag = false;

const elementCreating = (element, class1, class2, text) => {
  element = document.createElement(element);
  element.classList.add(class1, class2);
  if(text !== "") element.innerText = text;
  return element;
}

const renderNotes = () => {
  notes.forEach((note) => {
  
    const noteContainer = elementCreating("div", "container-item", "note-container", "");
    noteContainer.id = note.id;
    noteContainer.setAttribute("id", noteContainer.id);
  
    const noteTitle = elementCreating("h1", "note-title", "x", note.title);

    const noteNumber = elementCreating("h3", "note-number", "x", `#${note.id+1}`);
    
    const noteButtons = elementCreating("div", "notes-controls", "note-controls", "");
    
    const noteDelete = elementCreating("div", "delete-note", "notes-control", "");
    noteButtons.append(noteDelete);

    const explanationDelete = elementCreating("span", "explain", "x", "Delete this note")
    noteDelete.append(explanationDelete);

    const iconDelete = elementCreating("span", "icon", "x", "🗑");
    noteDelete.append(iconDelete);

    noteDelete.addEventListener('click', (e) => {
      const filter = notes.filter((note) => note.id != noteContainer.id);
      notes = filter;
      console.log(notes);
      const ancestorContainer = e.target.closest('.note-container');
      ancestorContainer.remove();
    })
    
    const noteEdit = elementCreating("div", "edit-note", "notes-control", "");
    noteButtons.append(noteEdit);

    const explanationEdit = elementCreating("span", "explain", "x", "Edit this note")
    noteEdit.append(explanationEdit);

    const iconEdit = elementCreating("span", "icon", "x", "✎");
    noteEdit.append(iconEdit);


    iconEdit.addEventListener('click', (e1) => {
      const objectNote = notes.find((note) => note.id == noteContainer.id);

      const body = document.querySelector("body");

      const window = elementCreating("div", "edit-window", "x", "");

      
      const container = elementCreating("div", "edit-container", "x", "");
      window.append(container)
      
      const title = elementCreating("h1", "edit-title", "x", "Edit note " + (objectNote.id + 1));
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

        notes[objectNote.id].title = inputTitle.value;
        notes[objectNote.id].content = inputContent.value;
        console.log(notes);
        notesContainer.innerHTML = "";
        renderNotes();
        window.remove();
      })
    })
    
    const noteContent = elementCreating("div", "note", "x", note.content);

    
    noteContainer.append(noteTitle, noteNumber, noteContent, noteButtons);
    notesContainer.append(noteContainer);
  })
}

renderNotes();

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
  IconAddNote.innerHTML = "+";
  renderNotes();
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