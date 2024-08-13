import { PiList } from "react-icons/pi"
import { useChat } from "../zustand"

export default function Welcome() {
    const {setOverlay} = useChat()

    return (
        <div className="flex flex-col">
            <div className="md:hidden p-4">
                <PiList onClick={() => setOverlay('bar')} className="text-2xl text-slate-400 hover:text-slate-50 cursor-pointer" />
            </div>
            <div className="grow grid content-center gap-y-4 text-center p-4 w-full max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold">Welcome</h1>
                <h1 className="text-lg text-slate-400">What do you want to do today? Start chatting with your friends!</h1>
            </div>
        </div>
    )
}