import { create } from 'zustand'
import axios from 'axios';

const notesStore = create((set) => ({
 
    notes: null,

    creatForm:{    //initial state for create form
        title:"",
        body:" "
    },

    updateForm:{    //initial state for update form
       _id: null,
        title:"",
        body:" "
    },

    fetchNotes: async ()=>{

     //fetch notes
    const res=await axios.get("http://localhost:3001/notes"); //study about axios

    //set to state
    set({
        notes: res.data.notes});
   
    },
 
    updateCreateFormField: (e)=>{

    const {name,value}=e.target;  //jo bhi enter kroge uski value dedega 
  
    set((state) =>{           //state update krdi humne
 
        return{
            creatForm:{
                
                ...state.creatForm,
                [name]:value, //name and value updated 
            },
        }; 
    });
  
    },

    createNote: async (e)=>{

    e.preventDefault();  //jb bhi app note create kroge to html page by default refresh hojata h ye usko prevent krega.
    
    const {creatForm,notes} =notesStore.getState();
        //create note
    const res=await axios.post("http://localhost:3001/notes",creatForm); //note bnaya and data bhej diya using createform.
        
       //update state

       set({
        notes: [...notes , res.data.note],
       
        creatForm:{
            title: "",
            body:"",
        },
    });
 },

 deleteNote: async(_id)=>{

    //delete the note
const res= await axios.delete(`http://localhost:3001/notes/${_id}`);

const {notes} =notesStore.getState();
  
//update state
 const newNotes = notes.filter((note) =>{

return note._id !==_id;  //return krega ek array of notes jisme _id vali id nhi h
   
});

set({notes: newNotes});

 },

 handleUpdateFieldChange: (e)=>{

    const{value,name}=e.target;

    set(state =>{
        return{

            updateForm:{
                ...state.updateForm,
                [name]: value,
             }
        }
    });
 },

 toggleUpdate: (note)=>{
    
    const {_id,title,body}=note;
    
    //set state of update form 
    set({
        updateForm:{
            title:note.title , 
            body:note.body ,
            _id : note._id,
        }
    });
},

updateNote: async (e)=>{
    e.preventDefault();
    const {
        updateForm:{title,body,_id },
        notes,
    }=notesStore.getState();
    
    
    //send update request
    const res=await axios.put(`http://localhost:3001/notes/${_id}`,{
        title,body
    });
    
    //update state
    const newNotes=[...notes];
    const noteIndex=notes.findIndex(note =>{
      
      return note._id === _id;  //jo humari purani note ki id thi agr vo new updated note ki id se match kr rhi h mtlb humne vhi note update ki h to uska index return ho k aajayega
    })

    newNotes[noteIndex]=res.data.note;    //new notes k us index pe jahan purani note thi jo hume uor se mila tha nayi updated note assig krdi
   
    set({
        notes:newNotes,
        updateForm:{    //clear update form state 
            _id: null,
            title:"",
             body:"",
        }
    })
    

   },
  

}));

export default notesStore;