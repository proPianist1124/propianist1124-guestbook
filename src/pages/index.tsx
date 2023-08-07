"use client"
import Head from "next/head"
import Link from "next/link"

import { get_users } from "./api/routes/get_users"
import Auth from "./auth"

export default function Index({user, users}:any){

  if(user == null || users.includes(user) == false){
    return <Auth/>
  }

  return (
    <>
    <Head>
      <title>Guestbook | Home</title>
    </Head>
    <p style = {{color:"var(--secondary)"}}>
      Come say hi, {user}!
      <Link href = "/api/actions/logout" style = {{float:"right", marginRight:15, color:"var(--error)"}}>
        Logout&nbsp;&nbsp;<i className="fa-solid fa-arrow-right-from-bracket"></i>
      </Link>
    </p>
    </>
  )
}

export async function getServerSideProps(context: { req: { cookies: { [x: string]: any } } }){
   const user_list = await get_users();

  let user = context.req.cookies.user;
  if(!user){
    user = null
  }

  return { props: {
    user,
    users:user_list
  } }
}