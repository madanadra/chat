import { PiMagnifyingGlass } from "react-icons/pi";
import { useChat } from "../zustand";

export default function SearchInput() {
    const {search, setSearch} = useChat()

    return (
        <div className="relative">
            <div className="grid place-content-center absolute top-0 bottom-0 left-0 p-4 pointer-events-none">
                <PiMagnifyingGlass className="text-2xl text-slate-400" />
            </div>
            <input type="text" placeholder="Search username" value={search} onChange={(e) => setSearch(e.target.value)} 
            className='w-full bg-transparent p-4 pl-14 outline-none' />
        </div>
    )
}