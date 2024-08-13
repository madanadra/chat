import { useChat } from "../zustand"

export default function LogoutModal() {
    const {overlay} = useChat()

    return (
        <div onClick={(e) => e.stopPropagation()} 
        className={`${overlay === 'logout' ? 'grid' : 'hidden'} content-center justify-items-center gap-y-8 bg-slate-900 w-full h-full anim-modal p-4`}>
            <h1 className="text-2xl font-semibold">Log out</h1>
            <div className="w-52 max-w-full h-1 bg-emerald-800 overflow-x-hidden">
                <div className="h-full bg-emerald-500 w-1/2 anim-loading -ml-[50%]" />
            </div>
        </div>
    )
}