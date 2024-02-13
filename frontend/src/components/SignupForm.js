import authStore from "../stores/authStore"
import { useNavigate } from "react-router-dom";

export default function SignupForm(){
    const store=authStore();
    const navigate= useNavigate();

    const handleSignup= async (e) =>{  
        e.preventDefault();
       await store.signup();
       navigate("/login");

    }
    return(
       <form onSubmit={handleSignup} className="my-sign">
            <input
             onChange={store.updateSignupForm} 
             value={store.signupForm.email}
             type="email"
              name="email" 
              placeholder="Email.."
              />

            <input
             onChange={store.updateSignupForm} 
            value ={store.signupForm.password}
             type="password" 
             name="password" 
             placeholder="Password.."
             />

            <button type="submit" className="btn">Signup</button>
        </form>
    )
}