import { useRef, useState } from "react"
import { useChat } from "../zustand"
import axios, { AxiosError } from "axios"
import { useCookies } from "react-cookie"
import { PiCameraRotate, PiSignOut } from "react-icons/pi"
import moment from "moment"

export default function BottomBar() {
    const {user, setUser, setOverlay, setError} = useChat()
    const [loading, setLoading] = useState<boolean>(false)
    const file = useRef<HTMLInputElement>(null)
    const [cookies, , removeCookie] = useCookies(['chat-auth-token'], {
        doNotParse: true,
        doNotUpdate: true
    })
    const token = cookies["chat-auth-token"]

    const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        setLoading(true)
        const image = e.currentTarget.files?.[0] as File
        const newImage = new FormData()
        newImage.append('image', image, image.name)
        try {
            const {data} = await axios.post(import.meta.env.VITE_API_BASE+'/update-image', newImage, {
                headers: { Authorization: 'Bearer '+token }
            })

            if (data.error) {
                setError(data.error)
            }

            user && setUser({...user, image: data.data})
        } catch(err) {
            const error = err as AxiosError

            if (error.response?.status === 401) setUser(null)
            else setError(error.message)
        } finally {
            if (file.current) {
                file.current.value = ''
            }
            
            setLoading(false)
        }
    }

    const logout = async () => {
        setError('')
        setOverlay('logout')
        try {
            await axios.delete(import.meta.env.VITE_API_BASE+'/logout', {
                headers: { Authorization: 'Bearer '+token }
            })

            removeCookie('chat-auth-token')
            setUser(null)
        } catch(err) {
            const error = err as AxiosError
    
            if (error.response?.status === 401) setUser(null)
            else setError(error.message)
        } finally {
          setOverlay(null)
        }
    }

    return (
        <div className="grid gap-y-4 p-4">
            <div className="flex items-center gap-x-4">
                <input ref={file} type="file" onChange={updateImage} className="hidden" />
                {loading ? <div className='w-5 aspect-square rounded-full border-2 border-slate-50 border-r-transparent animate-spin' /> :
                <PiCameraRotate onClick={() => file.current?.click()} className="text-xl text-slate-400 hover:text-slate-50 cursor-pointer" />}
                <PiSignOut onClick={logout} className="text-xl text-slate-400 hover:text-slate-50 cursor-pointer" />
            </div>
            <div className="flex items-center gap-x-4">
                <img src={import.meta.env.VITE_IMAGE_BASE+user?.image} alt="Profile photo" 
                className="w-12 aspect-square rounded-md object-cover object-center" />
                <div className="grid gap-y-1">
                    <h1 className="font-medium truncate">{user?.username}</h1>
                    <h1 className="text-sm text-slate-400 truncate">{user?.created_at ? moment(user?.created_at).format('ll') : '-'}</h1>
                </div>
            </div>
        </div>
    )
}