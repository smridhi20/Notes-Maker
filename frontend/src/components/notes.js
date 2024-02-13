import notesStore from "../stores/notesStore";
import Note from "./Note";

export default function Notes(){
    const store=notesStore();
    return(

        <div className="my-notes">
        
        {store.notes && 
        store.notes.map((note) =>{
          return <Note note={note}key={note._id} /> ;
             })}
         </div>
        )
}