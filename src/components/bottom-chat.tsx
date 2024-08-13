import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { PiPaperPlaneRight } from "react-icons/pi"
import { useChat } from "../zustand"
import { useCookies } from "react-cookie"
import axios, { AxiosError } from "axios"

export default function BottomChat() {
    const [text, setText] = useState<string>('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const {recipient, setUser, setError, setChat, setMessage} = useChat()
    const [loading, setLoading] = useState<boolean>(false)
    const [cookies] = useCookies(['chat-auth-token'], {
        doNotParse: true,
        doNotUpdate: true
    })
    const token = cookies["chat-auth-token"]

    const createMessage = async () => {
        setError('')
        setLoading(true)
        try {
            const {data} = await axios.post(import.meta.env.VITE_API_BASE+'/create-message/'+recipient?.id, {
                text: text
            },{
                headers: { Authorization: 'Bearer '+token }
            })

            if (data.error) {
                setError(data.error)
            }

            
            setText('')
            setChat(data.data.chat)
            setMessage(data.data.message)
        } catch(err) {
            const error = err as AxiosError
    
            if (error.response?.status === 401) setUser(null)
            else setError(error.message)
        } finally {
          setLoading(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }
          
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const { selectionStart, selectionEnd } = e.currentTarget
            const value = text.slice(0, selectionStart) + '\n' + text.slice(selectionEnd)
            setText(value)

            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + 1
                }
            }, 0)
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight
        }
    }, [text])

    const numberOfRows = text.split('\n').length

    return (
        <div className="flex items-end gap-x-4 w-full max-w-3xl mx-auto p-4">
            <textarea ref={textareaRef} value={text} onChange={handleChange} onKeyDown={handleKeyDown} rows={numberOfRows <= 6 ? numberOfRows : 6}
            className='resize-none w-full bg-slate-700 rounded-md py-2 px-3 ring-inset focus:ring-2 focus:ring-emerald-500 outline-none border-t border-slate-600' />
            <button onClick={() => text && createMessage()} disabled={loading} 
            className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-400 rounded-md p-2">
                {loading ? <div className='w-6 aspect-square rounded-full border-2 border-slate-50 border-r-transparent animate-spin' /> :
                <PiPaperPlaneRight className="text-2xl" />}
            </button>
        </div>
    )
}