"use client"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react"
import { SendHorizonal, LogOut } from "lucide-react"

import { get_users, get_pws, get_msgs } from "./api/data"
import Auth from "./auth"

export default function Index({user, msgs, dates, authors}:any){
  const router = useRouter()
  if(user == null){
    return <Auth/>
  }
  return (
    <>
    <Head>
      <title>Guestbook | Home</title>
    </Head>
    <p style = {{color:"var(--secondary)"}}>
      Come say hi, &quot;{user}&quot;!
      <button className = "danger" style = {{float:"right", marginRight:15, display:"flex", alignItems:"center"}} onClick = {() => router.push("/api/routes/logout")}>
        Logout&nbsp;&nbsp;<LogOut size = {15}/>
      </button>
    </p>
    <br></br>
    <div className = "card" style = {{maxWidth:400, border:"none"}}>
      <form action = "/api/routes/send" method = "POST" style = {{width:"100%", display:"flex"}}>
        <input placeholder = "leave a message…" name = "content" style = {{width:"800%"}} autoComplete = "off" required/>
        <button type = "submit" style = {{marginLeft:10, display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}><SendHorizonal size = {15}/></button>
      </form>
    </div>
    <br></br>
    <div className = "card" style = {{maxWidth:700}}>
      {msgs.map((msg: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) =>
        <div key = {`${msg}`} className = "message">
          {authors[msgs.indexOf(msg)]}: <span>{String(msg).slice(2)}</span><span style = {{color:"var(--secondary)", float:"right"}}>{dates[msgs.indexOf(msg)]}</span>
        </div>
      )}
      <br></br>
    </div>
    </>
  )
}

export async function getServerSideProps(context: { req: { cookies: { [x: string]: any } } }){
  const user_list = await get_users();

  let user = context.req.cookies.user;
  if(!user){
    user = null;
  }else{
    const pw = await get_pws();
    if(context.req.cookies.password != pw[user_list.indexOf(user)]){
      user = null;
    }
  }

  const message_data:any = await get_msgs();

  return {props:{
    user,
    msgs:message_data[0].reverse(),
    dates:message_data[1].reverse(),
    authors:message_data[2].reverse()
  }}
}