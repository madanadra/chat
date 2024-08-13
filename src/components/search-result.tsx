import { PiChatText } from "react-icons/pi";
import { useChat } from "../zustand";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";

type Result = {
    id: number
    image: string
    username: string
}[]

export default function SearchResult() {
    const {search, setError, setUser, setRecipient} = useChat()
    const [loading, setLoading] = useState<boolean>(false)
    const [result, setResult] = useState<Result>([])
    const [cookies] = useCookies(['chat-auth-token'], {
        doNotParse: true,
        doNotUpdate: true
    })
    const token = cookies["chat-auth-token"]

    const fetchSearch = async () => {
        setError('')
        try {
            const {data} = await axios.get(import.meta.env.VITE_API_BASE+'/search/'+search, {
                headers: { Authorization: 'Bearer '+token }
            })
    
            setResult(data.data)
        } catch(err) {
            const error = err as AxiosError
    
            if (error.response?.status === 401) setUser(null)
            else setError(error.message)
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        if (search) {
            const hold = setTimeout(() => {
                fetchSearch()
            }, 300)
    
            return () => {
                setLoading(false)
                clearTimeout(hold)
            }
        } else {
            setLoading(false)
            setResult([])
        }
    }, [search])

    return (
        <div className="relative h-80">
            <div className={`${loading ? '' : 'hidden'} absolute top-0 inset-x-0 h-1 bg-emerald-800 overflow-x-hidden`}>
                <div className="h-full bg-emerald-500 w-1/2 anim-loading -ml-[50%]" />
            </div>
            {result.length ? result.map(item => 
                <div key={item.id} onClick={() => setRecipient({id: item.id, image: item.image, username: item.username})} className="flex items-center gap-x-4 p-4 hover:bg-slate-700 cursor-pointer">
                    <div><PiChatText className="text-2xl text-slate-400" /></div>
                    <img src={import.meta.env.VITE_IMAGE_BASE+item.image} alt="Profile photo" 
                    className="w-8 aspect-square rounded-md border-t border-slate-700" />
                    <div className="grid">
                        <h1 className="font-medium truncate">{item.username}</h1>
                    </div>
                </div>
            ) : search && !loading ? 
            <div className="grid content-center h-full">
                <h1 className="text-lg text-slate-400 text-center p-4">No results for "<span className="text-slate-50">{search}</span>"</h1>
            </div> : []}
        </div>
    )
}