import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = () => {

     const context = useContext(noteContext);
     const {addNote} = context;
    const [note,setNote] = useState({title:"", description:"",tag:""});

    const handleSubmitClick=(e)=>{
        e.preventDefault();
        if(note.title===""){
            alert("Pleast enter title");
        }else{
        addNote(note.title,note.description,note.tag);
    }
}

    const onChange=(e)=>{
     setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <>
     <form>
  <div style={{marginTop:"20px"}} className="form-group">
    <label for="title">Title</label>
    <input type="text" onChange={onChange} className="form-control" id="title" name="title" placeholder="Enter title of the note"/>
  </div>
  <div className="form-group">
    <label for="description">Description</label>
    <textarea className="form-control" onChange={onChange} id="description" name="description" rows="3"></textarea>
  </div>
</form>
<input class="btn btn-primary" style={{marginTop:"10px"}} type="submit" onClick={handleSubmitClick} value="Submit"></input>
    </>
  )
}

export default AddNote
