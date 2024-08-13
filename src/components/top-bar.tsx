import { PiChats, PiMagnifyingGlass } from "react-icons/pi";
import { useChat } from "../zustand";

export default function TopBar() {
    const {setOverlay, setRecipient} = useChat()

    return (
        <div className="flex items-center justify-between gap-x-6 p-4">
            <div onClick={() => setRecipient(null)} className="flex items-center gap-x-2.5 cursor-pointer">
                <PiChats className="text-3xl text-emerald-500" />
                <h1 className="font-semibold text-2xl">Chat</h1>
            </div>
            <PiMagnifyingGlass onClick={() => setOverlay('search')} className="text-2xl text-slate-400 hover:text-slate-50 cursor-pointer" />
        </div>
    )
}