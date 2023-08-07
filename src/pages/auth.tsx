import Head from "next/head"

export default function Auth(){
    return(
        <>
        <Head>
            <title>Guestbook | Login</title>
        </Head>
        <p style = {{color:"var(--error)"}}>You must be logged in</p>
        <br></br>
        <form action = "/api/actions/login" method = "POST">
            <input type = "text" name = "username" placeholder = "username…" autoComplete = "off"></input>
            <input type = "password" name = "password" placeholder = "password…"></input>
            <button type = "submit">login</button>
        </form>
        </>
    )
}