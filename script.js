const button = document.querySelector(".btn");
const app = document.querySelector(".app");

getNote().forEach(note => {
  const noteEL = createNoteElm(note.id, note.content)
  app.insertBefore(noteEL, button)
});

function createNoteElm(id, content) {
  const element = document.createElement("textarea")
  element.classList.add("note")
  element.placeholder = "Empty Note"
  element.value = content

  element.addEventListener("dblclick", () =>{
    const warning = confirm("Do you want to delete this note?");
    if(warning) {
      deleteNote(id,element)
    }
  })

  element.addEventListener("input", () =>{
    updateNote(id,element.value)
  })

  return element;
};

function deleteNote(id, element) {
  const notes = getNote().filter((note) => note.id != id);
  saveNote(notes);
  app.removeChild(element);
};

function updateNote(id, content) {
  const notes = getNote()
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNote(notes)
};

function addNote() {

  const notes = getNote();

  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };
 
  const noteElm = createNoteElm(noteObj.id, noteObj.content);
  app.insertBefore(noteElm, button);

  notes.push(noteObj);

  saveNote(notes)

};

function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
};

function getNote() {
  return JSON.parse(localStorage.getItem("note-app") || "[]")
};

button.addEventListener("click", () =>{
  addNote();
})