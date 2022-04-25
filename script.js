const addTxt=document.getElementById('addTxt')
const addBtn=document.getElementById('addBtn')
let EditBtn=document.getElementById('EditBtn');
const noteTitle=document.getElementById('noteTitle');
showNotes()
function localStroageCall() {
    let getItem=localStorage.getItem("AllNotes");
    if (getItem===null) {
        notesObj=[]
    }else{
        notesObj=JSON.parse(getItem);
    }
}
function EditTitle(title) {
    let editTitle=document.getElementById('editTitle').innerText=`${title}`
}
addBtn.addEventListener("click",()=>{
    localStroageCall();
    if (!addTxt.value || !noteTitle.value) {
        alert('Enter the Text');
    } else {
        obj={
            title:noteTitle.value,
            note:addTxt.value
        };
        notesObj.push(obj);
        localStorage.setItem("AllNotes",JSON.stringify(notesObj));
        addTxt.value="";
        noteTitle.value="";
    }
    showNotes();
});
function showNotes(){
    localStroageCall();
    let html="";
    let notes=document.getElementById('notes');
    notesObj.forEach(function(ele,index) {
     html +=`<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
     <div class="card-body">
         <h6 class="card-title">Title: ${ele.title}</h6>
         <p class="card-text">Note: ${ele.note}</p>
         <button onclick="editNote(${index})" class="btn btn-primary">Edit Note</button>
         <button onclick="deleteNote(${index})" class="btn btn-danger">Delete Note</button>

     </div>
 </div>
     `  
    });
    if (notesObj.length != 0) {
        notes.innerHTML=html;
    }else{
        notes.innerHTML="Opps No Note Here..."
    }
}
// editnote
function editNote(index){
    EditTitle("Edit note and save it")
    localStroageCall();
    let {title,note}=notesObj[index];
    // console.log(title,note);
    let saveTxt=document.getElementById('saveTxt');
    saveTxt.value=index;
    let EditBtn=document.getElementById('EditBtn');
    noteTitle.value=title;
    addTxt.value=note;
    addBtn.classList.add('d-none')
    EditBtn.classList.remove("d-none")    
}
EditBtn.addEventListener("click",()=>{
    EditTitle("Add a note");
    let getItem=localStorage.getItem("AllNotes");
    notesObj=JSON.parse(getItem);
    let saveTxt=document.getElementById('saveTxt').value;
    notesObj[saveTxt]={title:noteTitle.value,note:addTxt.value};
    console.log(notesObj[saveTxt]) 
    localStorage.setItem("AllNotes",JSON.stringify(notesObj));
    addTxt.value="";
    addBtn.classList.remove('d-none')
    EditBtn.classList.add("d-none")   
    showNotes();
});
// delete
function deleteNote(index){
localStroageCall();
notesObj.splice(index, 1);
localStorage.setItem("AllNotes", JSON.stringify(notesObj));
showNotes();
}
