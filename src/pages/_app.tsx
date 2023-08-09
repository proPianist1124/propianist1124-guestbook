import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Script from "next/script"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
    <h2 className = "brand" onClick = {() => router.push("/")} style = {{width:"auto"}}>👋 Sign my Guestbook!</h2>
    <Script src="https://kit.fontawesome.com/09556a902e.js" crossOrigin="anonymous"></Script>
    <Component {...pageProps} />
    </>
  )
}