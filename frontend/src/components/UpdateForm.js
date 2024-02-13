import notesStore from "../stores/notesStore"

export default function UpdateForm()
{
    const store=notesStore();
    if(!store.updateForm._id) return <></>   //jis id pe click kiya h agr vo exist ni krti h to return nothing 
  
    //else this form will appear
    return(

    <div className="create">
     <h2>Update note</h2>
    <form onSubmit={store.updateNote}>
      <input 
         onChange={store.handleUpdateFieldChange}
         value={store.updateForm.title}
        name="title"
      />
        <textarea
            onChange={store.handleUpdateFieldChange} 
             value={store.updateForm.body}
             name="body"
            />
          <button type="submit">Update note</button>
        </form>
      </div>
      )
}

