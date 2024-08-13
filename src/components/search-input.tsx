import { PiMagnifyingGlass } from "react-icons/pi";
import { useChat } from "../zustand";
import { useEffect, useRef } from "react";

export default function SearchInput() {
    const {search, overlay, setSearch} = useChat()
    const input = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        overlay === 'search' && input.current && input.current.focus()
    }, [overlay])

    return (
        <div className="relative">
            <div className="grid place-content-center absolute top-0 bottom-0 left-0 p-4 pointer-events-none">
                <PiMagnifyingGlass className="text-2xl text-slate-400" />
            </div>
            <input ref={input} type="text" placeholder="Search username" value={search} onChange={(e) => setSearch(e.target.value)} 
            className='w-full bg-transparent p-4 pl-14 outline-none' />
        </div>
    )
}