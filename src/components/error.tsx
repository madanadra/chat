import { PiX } from "react-icons/pi";
import { useChat } from "../zustand";

export default function Error() {
    const {error, setError} = useChat()

    return (
        <div className={`${error ? '' : 'hidden'} 
        grid justify-items-end fixed top-0 right-0 w-full max-w-3xl p-4 z-40 translate-x-full anim-error`}>
            <div className="flex items-start gap-x-6 p-4 rounded-md bg-red-100 text-red-700 border-l-8 border-red-500">
                <h1 className="text-sm font-medium break">{error}</h1>
                <div>
                    <PiX onClick={() => setError('')} className="text-xl text-slate-400 hover:text-red-700 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}