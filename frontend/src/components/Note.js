import notesStore from "../stores/notesStore";

export default function Note({note})
{
 const store =  notesStore(store =>{
        return{ deleteNote :store.deleteNote, toggleUpdate: store.toggleUpdate};
    })
    return(
            <div key={note._id} className="the-notes">
        <h3 className="notes-head">{note.title}</h3>
        <p className="para">{note.body}</p>
        <div className="mybtns">
        <button onClick={()=>store.deleteNote(note._id)} className="du-btn">
         Delete note
         </button>
         <button onClick={() => store.toggleUpdate(note)} className="du-btn">
           Update note
           </button>
        </div>
       </div>
        
    ); 
}