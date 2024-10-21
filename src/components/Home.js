import React  from 'react'
import Notes from './Notes';
import AddNote from './AddNote';

const Home=()=> {
  return (
    <> 
   <AddNote/>
{/* Fetching notes content */}
  <Notes />
  </>
  )
}

export default Home;
