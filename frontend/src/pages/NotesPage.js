import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../components/notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";

export default function NotesPage(){

    const store= notesStore();

    //to start the app
    useEffect(()=>{   //first arguement is a function you want to run when the app starts
 
     store.fetchNotes();
 
   },[]);  //second is an array where ypu put dependencies.
    
   return(
        <div className="note-des">
            <Notes/>  
            <UpdateForm/> 
            <CreateForm/>
        </div>
    )
}