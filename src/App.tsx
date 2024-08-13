import Error from "./components/error"
import Splash from "./components/splash"
import { useEffect, useState } from "react"
import { State, useChat } from "./zustand"
import { useCookies } from "react-cookie"
import axios, { AxiosError } from "axios"
import Auth from "./components/auth"
import Unauth from "./components/unauth"
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: any
    Echo: any
  }
}

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const {user, recipient, setUser, setError, setChat, setMessage, reset} = useChat()
  const [cookies] = useCookies(['chat-auth-token'], {
    doNotParse: true,
    doNotUpdate: true
  })
  const token = cookies["chat-auth-token"]

  const getUser = async () => {
    setError('')
    setLoading(true)
    try {
        const {data} = await axios.get(import.meta.env.VITE_AUTH_TOKEN+'/get-user', {
            headers: { Authorization: 'Bearer '+token }
        })

        setUser(data.data)
    } catch(err) {
        const error = err as AxiosError

        if (error.response?.status !== 401) setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (window.location.pathname !== '/' || window.location.search !== '') {
      window.history.pushState(null, '', '/')
    }
  }, [])

  useEffect(() => {
    if (user) {
      window.Pusher = Pusher

      window.Echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT,
        wssPort: import.meta.env.VITE_REVERB_PORT,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
        authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
        bearerToken: token
      })
        
      window.Echo.private('message.'+user.id).listen('GotMessage', (e: {sender: number, chat: State['chat'], message: State['message']}) => {
        if (recipient && e.sender === recipient.id) {
          setMessage(e.message)
        }

        setChat(e.chat)
      })

      return () => {
        window.Echo.leave('message.'+user.id)
      }
    }
  }, [user])

  useEffect(() => {
    if (token) {
      getUser()
    } else setLoading(false)
  }, [token])

  useEffect(() => {
    if (!user) {
      reset()
    }
  }, [user])

  return (
    <div className='bg-slate-900 text-slate-50 w-full min-h-dvh tabular-nums'>
      <Error />
      {loading ? <Splash /> : user ? <Auth /> : <Unauth />}
    </div>
  )
}

export default App
