import { useEffect } from "react"
import { PiList } from "react-icons/pi"
import { useChat } from "../zustand"

export default function TopChat() {
    const {recipient, setOverlay} = useChat()

    useEffect(() => {
        setOverlay(null)
    }, [recipient])

    return (
        <div className="bg-slate-800 flex items-center gap-x-4 p-4 border-b border-slate-700">
            <div><PiList onClick={() => setOverlay('bar')} className="md:hidden text-2xl text-slate-400 hover:text-slate-50 cursor-pointer" /></div>
            <img src={import.meta.env.VITE_IMAGE_BASE+recipient?.image} alt="Profile photo" 
            className="w-8 aspect-square rounded-md object-cover object-center" />
            <div className="grid">
                <h1 className="font-medium truncate">{recipient?.username}</h1>
            </div>
        </div>
    )
}