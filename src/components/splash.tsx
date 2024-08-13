import { PiChats } from "react-icons/pi";

export default function Splash() {
    return (
        <div className="fixed inset-0 grid content-center justify-items-center gap-y-8 bg-slate-900 p-4">
            <PiChats className="text-8xl text-emerald-500" />
            <div className="w-52 max-w-full h-1 bg-emerald-800 overflow-x-hidden">
                <div className="h-full bg-emerald-500 w-1/2 anim-loading -ml-[50%]" />
            </div>
        </div>
    )
}