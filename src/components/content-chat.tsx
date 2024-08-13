import { useEffect, useRef, useState } from "react"
import { useChat } from "../zustand"
import axios, { AxiosError } from "axios"
import { useCookies } from "react-cookie"
import moment from "moment"

export default function ContentChat() {
    const [loading, setLoading] = useState<boolean>(false)
    const {user, recipient, message, setError, setUser, setMessage} = useChat()
    const div = useRef<HTMLDivElement | null>(null)
    const [cookies] = useCookies(['chat-auth-token'], {
        doNotParse: true,
        doNotUpdate: true
    })
    const token = cookies["chat-auth-token"]

    moment.locale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : 'YYYY/MM/DD',
            nextWeek : 'YYYY/MM/DD',
            sameElse : 'YYYY/MM/DD'
        }
    })

    const getMessage = async () => {
        setError('')
        try {
            const {data} = await axios.get(import.meta.env.VITE_AUTH_TOKEN+'/get-message/'+recipient?.id, {
                headers: { Authorization: 'Bearer '+token }
            })

            setMessage(data.data)
        } catch(err) {
            const error = err as AxiosError

            if (error.response?.status === 401) setUser(null)
            else setError(error.message)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        setMessage({})
        setLoading(true)
        getMessage()
    }, [recipient])

    useEffect(() => {
        if (div.current) {
          div.current.scrollTop = div.current.scrollHeight
        }
    }, [message])

    return (
        <div className="grow overflow-y-hidden">
            <div className={`${loading ? '' : 'hidden'} w-full h-1 bg-emerald-800 overflow-x-hidden`}>
                <div className="h-full bg-emerald-500 w-1/2 anim-loading -ml-[50%]" />
            </div>
            <div ref={div} className="grid content-start gap-y-4 p-4 overflow-y-auto w-full max-w-3xl mx-auto h-full">
                {Object.keys(message).map(key => 
                    <div key={key} className="grid content-start gap-y-1">
                        <h1 className={`${key ? '' : 'hidden'} text-xs rounded-full py-1.5 px-2.5 mx-auto bg-slate-800 text-slate-400`}>
                            {moment(key).calendar()}
                        </h1>
                        {message[key].map((item, i) => 
                            <div key={item.id} className={`${item.user_id === user?.id ? 'justify-end ml-auto flex-row-reverse' : 'justify-start'} grid gap-y-2 max-w-[80%]`}>
                                <div className={`${item.user_id === user?.id ? 'bg-emerald-800' : 'bg-slate-800'} relative rounded-md py-1.5 px-2.5 whitespace-pre-wrap
                                ${(i === 0 ? true : message[key][i-1].user_id !== item.user_id) && item.user_id === user?.id ? 
                                'rounded-tr-none bubble-right mt-1' : (i === 0 ? true : message[key][i-1].user_id !== item.user_id) && item.user_id !== user?.id ? 
                                'rounded-tl-none bubble-left mt-1' : ''}`}>
                                    <h1 className="text-sm">
                                        {item.text} <span className="invisible text-xs ml-2">{item.created_at ? moment(item.created_at).format('hh.mm a') : '-'}</span>
                                    </h1>
                                    <h1 className="absolute right-2.5 bottom-1.5 text-xs text-slate-400">{item.created_at ? moment(item.created_at).format('hh.mm a') : '-'}</h1>
                                </div>
                                {/* <h1 className={`${seen ? '' : 'hidden'} text-xs text-right text-sky-500`}>Seen</h1> */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}