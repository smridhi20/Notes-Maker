import React from "react";
import authStore from "../stores/authStore"
import { useNavigate } from "react-router-dom";

export default function LoginForm()
{
    const store=authStore();
    const navigate=useNavigate(); 
    const handlelogin= async(e) =>{

        e.preventDefault();
        await store.login();

        //navigate
        navigate("/");

    }
    return(
        <form onSubmit={handlelogin} className="my-sign">
            <input
             onChange={store.updateLoginForm} 
             value={store.loginForm.email}
             type="email"
              name="email" 
              placeholder="Email.."
              />

            <input
             onChange={store.updateLoginForm} 
            value ={store.loginForm.password}
             type="password" 
             name="password" 
             placeholder="Password.."
             />

            <button type="submit" className="btn">Login</button>
        </form>
    )
}