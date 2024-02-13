const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
   }=require('./controllers/notescontroller');
const app=express();
const usersController=require("./controllers/usersController")
const cookieParser=require('cookie-parser');
const requireAuth=require('./middleware/requireAuth');

app.use(express.json()); //express cannot read json directly from the req body and our server deals with json data.
//the above statement will help express to read  json.
app.use(cors({
    origin:true,
    credentials:true,

}));  //to allow request from diffrent domain by default server wont allow
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/db1").then(()=>{
    console.log("connected to database");
});

app.post('/signup',usersController.signup);

app.post('/login',usersController.login);

app.get('/logout',usersController.logout);

app.get('/check-auth',requireAuth, usersController.checkAuth); //this checks if a user is logged in or if the token is valid

app.get('/notes', fetchNotes);

app.get('/notes/:id', fetchNote) ;

app.post('/notes', createNote);

app.put('/notes/:id',updateNote);

app.delete('/notes/:id',deleteNote);
app.listen(3001,()=> {
    console.log("server started");
});