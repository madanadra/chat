import { useEffect, useState } from "react"
import { useChat } from "../zustand"
import axios, { AxiosError } from "axios"
import { useCookies } from "react-cookie"
import moment from "moment"

export default function ContentBar() {
    const {recipient, chat, setUser, setRecipient, setError, setChat} = useChat()
    const [loading, setLoading] = useState<boolean>(true)
    const [cookies] = useCookies(['chat-auth-token'], {
        doNotParse: true,
        doNotUpdate: true
    })
    const token = cookies["chat-auth-token"]

    const getChat = async () => {
        setError('')
        try {
            const {data} = await axios.get(import.meta.env.VITE_AUTH_TOKEN+'/get-chat', {
                headers: { Authorization: 'Bearer '+token }
            })

            setChat(data.data)
        } catch(err) {
            const error = err as AxiosError

            if (error.response?.status === 401) setUser(null)
            else setError(error.message)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        getChat()
    }, [])

    return (
        <div className="grow overflow-y-auto">
            <div className={`${loading ? '' : 'hidden'} w-full h-1 bg-emerald-800 overflow-x-hidden`}>
                <div className="h-full bg-emerald-500 w-1/2 anim-loading -ml-[50%]" />
            </div>
            {chat.length ? chat.map(item => 
                <div key={item.user.id} onClick={() => setRecipient({id: item.user.id, image: item.user.image, username: item.user.username})} 
                className={`${item.user.username === recipient?.username ? 'bg-slate-700' : 'hover:bg-slate-700'} flex items-center gap-x-4 p-4 cursor-pointer`}>
                    <img src={import.meta.env.VITE_IMAGE_BASE+item.user.image} alt="Profile photo" 
                    className="w-12 aspect-square rounded-md object-cover object-center" />
                    <div className="grid gap-y-1 w-full">
                        <div className="flex items-center gap-x-4 overflow-x-hidden">
                            <h1 className="grow font-medium truncate">{item.user.username}</h1>
                            <h1 className="text-xs text-slate-400">
                                {!item.message.created_at ? '-' : 
                                moment(item.message.created_at).isSame(moment(), 'day') ? moment(item.message.created_at).format('hh.mm a') : 
                                moment(item.message.created_at).format('YYYY/MM/DD')}
                            </h1>
                        </div>
                        <h1 className="text-sm text-slate-400 truncate">{item.message.text}</h1>
                    </div>
                </div>
            ) : []}
        </div>
    )
}