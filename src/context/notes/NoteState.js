import noteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) =>{
  const host = "http://localhost:5000/";
const notesInitial = [];
  const [notes,setNotes] = useState(notesInitial);

const getNotes = async () =>{
  const response = await fetch(`${host}api/note/fetchallnotes`,{
    method : 'GET',
    headers : {
      'Content-Type':'application/json',
      "authtoken":localStorage.getItem('token')
    },
});
const json = await response.json();
setNotes(json);
}
  // Add Note function
  const addNote=async(title,description,tag)=>{
   const response =  await fetch(`${host}api/note/createnote`,{
      method : 'POST',
      headers : {
        'Content-Type':'application/json',
        'authtoken':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note)); 
  };

  const deleteNote=async(id)=>{
    // API call
     await fetch(`${host}api/note/deletenote/${id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type':'application/json',
        "authtoken":localStorage.getItem('token')
      },
  });
  // Delete UI func..
   const newNotes = notes.filter((notes)=>{return notes._id!==id});
   setNotes(newNotes);
  };

  const editNote=async(id,title,description,tag)=>{
    // API Call
     await fetch(`${host}api/note/updatenote/${id}`,{
      method : 'POST',
      headers : {
        'Content-Type':'application/json',
         'authtoken':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    // Edit note func ui
    for(let i=0; i<notes.length;i++){
      const element = notes[i];
      if(element._id===id){
        element.title = title;
        element.description=description;
        element.tag=tag;
      }
    }
  }
  
  

return(
  <noteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNotes}}>
     {props.children}
  </noteContext.Provider>
);
}

export default NoteState;