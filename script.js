
showNotes(); //Calling the showNotes() function to show the notes everytime the page loads
let textA = document.querySelector("textarea");
  let my_btn = document.querySelector(".my_btn");
   my_btn.addEventListener("click", ()=>{
    let notesValue = localStorage.getItem("notes");
    if(notesValue==null){
        notesValue = [];
    }
    else{
        notesValue = JSON.parse(notesValue);
    }
    notesValue.push(textA.value);
    localStorage.setItem("notes", JSON.stringify(notesValue));
    textA.value = "";
    console.log(notesValue);
    showNotes();
   })
   function showNotes(){
    let inside_parent = document.querySelector(".parent-notes");
    let notesValue = localStorage.getItem("notes");
    if(notesValue==null || notesValue=='[]'){
      notesValue = [];
      inside_parent.innerHTML = `<p style="margin-left: 2%;">No notes added yet<p>`;
    }
    else{
    notesValue = JSON.parse(notesValue);
   
    let temp = '';
  //This forEach loop will copy all the values from our notes storage array into the divs of the card
  //It stores all the divs inside a temp variable
    notesValue.forEach(function(element, index) {
      temp+=`  <div class="card main_card" style="width: 15rem; display: inline-block; margin-left: 2%; margin-bottom: 1%;">                                                                                                                                               
    <div class="card-body">
      <h5 class="card-title">Note ${index+1}</h5>
      <p class="card-text">${element}</p>
      <button href="#" onclick= "delete_note(this.id)" id="${index}" class="btn btn-primary to_delete">Delete Note</button>
    </div>
  </div>`;
    });
  //Assigning the value of the temp into innerHTML of our parent div, where all our cards will be stored 
    inside_parent.innerHTML = temp;
    }
   };


  //This is the proper function to delete the note
  function delete_note(index){
    let notesValue = localStorage.getItem("notes");
    if(notesValue==null){
        notesValue = [];
    }
    else{
        notesValue = JSON.parse(notesValue);
        notesValue.splice(index, 1); //Deleting the note from the array using splice method
        //Updating the local storage again after deleting a note
        localStorage.setItem("notes", JSON.stringify(notesValue));
        showNotes();
    }
  }

  //Event listener for the search textarea to search something in the notes

  let search_area = document.querySelector(".searchTxt");
  search_area.addEventListener("input", (event)=>{
    console.log("input event fired");
    let notesValue = localStorage.getItem("notes");
    if(notesValue==null || notesValue=='[]'){
      notesValue = [];
      inside_parent.innerHTML = `<p style="margin-left: 2%;">No notes added yet<p>`;
    }
    else{
    notesValue = JSON.parse(notesValue);
    let inputVal = search_area.value;
    console.log(inputVal);
    notesValue.forEach(function(element, index){
      let hide1 = document.getElementById(`${index}`);
      let hide2 = hide1.parentElement;
      let hide3 = hide2.parentElement;
      if(!element.includes(inputVal)){
       hide3.style.display = "none";
      }
     else{
        hide3.style.display = "inline-block";
     }
    })
    }
  })