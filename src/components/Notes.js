import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const context = useContext(noteContext);
  const {notes,getNotes} = context;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{  
    if(localStorage.getItem('token')){
      getNotes().then(() => setLoading(false));
    }else{
      navigate("/login");
    }
      // eslint-disable-next-line
  },[]);

  const updateNote =(e)=>{
    ref.current.click();
  }
  const ref = useRef(null);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
  <div className='row'>
       {notes.map((notes)=>{
         return <Noteitem  key={notes._id} note={notes} updateNote={updateNote}></Noteitem>
  })}
    </div>
    </>
  )
}

export default Notes;
