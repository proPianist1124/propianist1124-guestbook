import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from "next/script"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <h2>👋 Sign my Guestbook!</h2>
    <Script src="https://kit.fontawesome.com/09556a902e.js" crossOrigin="anonymous"></Script>
    <Component {...pageProps} />
    </>
  )
}