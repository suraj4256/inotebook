const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

// Route 1 to get user's notes 
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        return res.json(notes);
    } catch (error) {
        return res.status(500).send({error: "Server Error"})
    }
})

// Route 2 to create notes

router.post('/createnote',[
    body("title","Min length is 3").isLength({min:3}),
    body("description", "Min length is 5").isLength({min:5})
],fetchuser,async (req,res)=>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).send({error: error.array})
  }

  try {
   const {title,description,tag} = req.body;
   console.log("User ID in createnote:", req.user.id); 

   const note = await Notes.create({
    "user": req.user.id,
    "title" : title,
    "description" : description,
    "tag" : tag
   })
   return res.json(note);
    
  } catch (error) {
    console.error("Error creating note", error);
    return res.status(500).send({error: "Server Error"})
  }
})

// Route to update notes 

router.put('/updatenote/:id',[
    body("title","Min length is 3").isLength({min:3}),
    body("description", "Min length is 5").isLength({min:5})
],fetchuser,async (req,res)=>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).send({error: error.array})
  }
  try {
   const {title,description,tag} = req.body;
   const existingNote = await Notes.findById(req.params.id);
   if(!existingNote){
    return res.status(400).send({error:"Notes doesn't exist"});
    } 
    if(existingNote.user.toString() !== req.user.id){
      return res.status(400).send({error:"Unauthorized Action"});
    }
    else{
      const updateNote = await Notes.findByIdAndUpdate(req.params.id, {$set:{title,description,tag}},{new:true});

     return res.json(updateNote);
    }
} catch (error) {
    console.error("Error creating note", error);
    return res.status(500).send({error: "Server Error"})
  }
})

// Route to delete Note

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
try {
 const existingNote = await Notes.findById(req.params.id);
 if(!existingNote){
  return res.status(400).send({error:"Notes doesn't exist"});
  } 
  if(existingNote.user.toString() !== req.user.id){
    return res.status(400).send({error:"Unauthorized Action"});
  }
  else{
    const deleteNote = await Notes.findByIdAndDelete(req.params.id);
    return res.json({message : "Note deleted successfully"});
  }
} catch (error) {
  console.error("Error creating note", error);
  return res.status(500).send({error: "Server Error"})
}
})

module.exports = router;