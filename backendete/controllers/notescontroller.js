const Note= require("../models/note");

const fetchNotes= async (req,res)=>{   //fetching the notes

    //find the notes
 const notes=await Note.find();

    //respond with them
    res.json({notes:notes});
};

const fetchNote= async (req,res)=>{   //fetching a specific node using id
 
    //get id off the url
     
    const noteId=req.params.id;  //params is used for destructuring. is se id noteid mein aa jayegi
    
    //fiding the node using id
    const note=await Note.findById(noteId); 
     
    //respond with the note
    res.json({note:note});
};

const createNote= async (req,res)=>{  //anytime someone posts note the function will run basically creating a note
  
    //get the sent in data off request body
    
    // const title=req.body.title;
    // const body =req.body.body;

    const{title , body} =req.body;

    //create a note with it
   const note= await Note.create({
         title,
         body
    });

    //respond with new note
      res.json({ note });
};

  const updateNote= async(req,res)=>{   //to update

    //get the id off the url
     const noteId = req.params.id;

    //get the data off the req body
    const title=req.body.title;
    const body=req.body.body;
    
    //find and update
    await Note.findByIdAndUpdate(noteId,{  //this will update ypur note but will not return it.so after updating you have to find it again
     
        title:title,
        body:body,
    });

    //find updated note
    const note =await Note.findById(noteId);
   
    //respond with the updated note
    res.json({note: note});  
};

const deleteNote= async (req,res)=>{

    //get id off the url
     const noteId=req.params.id;

    //delete the note
     await Note.deleteOne({_id: noteId});
   
     //respond
     res.json({success: "note deleted"});
};

module.exports={

 fetchNotes,
     fetchNote,
     createNote,
     updateNote,
      deleteNote,
};