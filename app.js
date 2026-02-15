const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

document.addEventListener("DOMContentLoaded", loadNotes);

addBtn.addEventListener("click", addNote);

function addNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Please fill all fields");
        return;
    }

    const note = {
        id: Date.now(),
        title,
        content
    };

    saveNote(note);
    displayNote(note);

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

function displayNote(note) {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.setAttribute("data-id", note.id);

    noteDiv.innerHTML = `
        <button class="delete-btn">X</button>
        <h3>${note.title}</h3>
        <p>${note.content}</p>
    `;

    noteDiv.querySelector(".delete-btn").addEventListener("click", () => {
        deleteNote(note.id);
        noteDiv.remove();
    });

    notesContainer.appendChild(noteDiv);
}

function saveNote(note) {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem("flownotes", JSON.stringify(notes));
}

function loadNotes() {
    const notes = getNotes();
    notes.forEach(displayNote);
}

function deleteNote(id) {
    let notes = getNotes();
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("flownotes", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("flownotes")) || [];
}
