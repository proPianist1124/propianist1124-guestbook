import Head from "next/head"
import { useState } from "react"

export default function Auth(){
    let forms = true;
    let [ state, setState ] = useState(forms)

    return(
        <>
        <Head>
            <title>Guestbook | Login</title>
        </Head>
        <br></br>
        <div className = "card">
            <br></br>
            <span style = {{fontWeight:"bold", fontSize:19}}>
                {state ? "Login" : "Signup"}
            </span>
            <br></br><br></br>
            {state ? 
            <>
            <form action = "/api/routes/login" method = "POST">
                <br></br>
                <label>Username</label>
                <div style = {{padding:"2px"}}></div>
                <input type = "text" name = "username" placeholder = "john.doe" autoComplete = "off" style = {{width:"100%"}} required></input>
                <br></br><br></br>
                <label>Password</label>
                <div style = {{padding:"2px"}}></div>
                <input type = "password" name = "password" placeholder = "•••••••••" style = {{width:"100%"}} required></input>
                <br></br><br></br>
                <button type = "submit" style = {{width:"100%"}}>login</button>
                <br></br><br></br>
            </form>
            <p className = "switch" onClick = {()=> setState(!state)}>No Account?</p>
            </>:
            <>
            <form action = "/api/actions/signup" method = "POST">
                <br></br>
                <label>Username</label>
                <div style = {{padding:"2px"}}></div>
                <input type = "text" name = "username" placeholder = "john.doe" autoComplete = "off" style = {{width:"100%"}} required></input>
                <br></br><br></br>
                <label>Password</label>
                <div style = {{padding:"2px"}}></div>
                <input type = "password" name = "password" placeholder = "P@ssw0rd" style = {{width:"100%"}} required></input>
                <br></br><br></br>
                <button type = "submit" style = {{width:"100%"}}>signup</button>
                <br></br><br></br>
            </form>
            <p className = "switch" onClick = {()=> setState(!state)}>Login instead</p>
            </>}
        </div>
        </>
    )
}