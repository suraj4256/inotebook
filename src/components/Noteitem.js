import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const {note,updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    
    const handleDelete=(e)=>{
      e.preventDefault();
      deleteNote(note._id);
    }
    
    const handleUpdate=(note)=>{
      updateNote(note);
    }

  return (
    <div className="col-md-3 mt-5"><div className="card" >
         <div className="card-body">
           <h5 className="card-title" style={{display:"flex"}} >{note.title}<i style={{"cursor":"pointer","marginLeft":"5px", "marginTop":"4px"}} onClick={handleDelete} className="fa-regular fa-square-minus"></i> <i style={{"cursor":'pointer',"marginLeft":"5px","marginTop":"4px"}} onClick={handleUpdate} className="fa-regular fa-square-plus"></i></h5>
           <p className="card-text">{note.description}</p>
         </div>
       </div></div> 
  )
}

export default Noteitem
