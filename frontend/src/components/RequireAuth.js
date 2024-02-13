import { useEffect } from "react";
import {Navigate} from 'react-router-dom';
import authStore from "../stores/authStore"

export default function RequireAuth(props){
    const store=authStore();

    useEffect(()=> {

        if(store.loggedIn === null){
            store.checkAuth();
        }
    },[])
     
    if(store.loggedIn === null)
    {
        return <div>Loading</div>
    }
    if(store.loggedIn === false){
        return <Navigate to="/login"/>;
    }

    return( <div>{props.children}</div>)
    //props.childern return whatever is in between the <RequireAuth> tags,means <RequireAuth> is tag k beech 
    //mein jo  bhi data h vo props.childersn ko assign ho jayega
}