import notesStore from "../stores/notesStore";

export default function CreateForm()
{ 
    const store=notesStore();
    if(store.updateForm._id)     return<></> //agar clicked  exist then return nothing
    
    //agar clicked id does not exist then create note vala form appear hoga 
    return(
    <div className="create">
      <h2>Create note</h2>
      <form onSubmit={store.createNote}>
        <input
         onChange={store.updateCreateFormField} 
        value={store.creatForm.title} 
        name="title"
        placeholder="Type the title..."
        />
        
        <textarea 
        onChange={store.updateCreateFormField} 
        value={store.creatForm.body} 
        name= "body"
        />
        <button type="submit">Create note</button>
      </form>
    </div>
    );

}