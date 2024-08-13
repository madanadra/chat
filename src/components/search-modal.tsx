import { useEffect } from "react";
import { useChat } from "../zustand";
import SearchInput from "./search-input";
import SearchResult from "./search-result";

export default function SearchModal() {
    const {overlay, setSearch} = useChat()

    useEffect(() => {
        overlay !== 'search' && setSearch('')
    }, [overlay])

    return (
        <div className={`${overlay === 'search' ? 'grid' : 'hidden'} grid content-center w-full h-full max-w-sm mx-auto p-4`}>
            <div onClick={(e) => e.stopPropagation()} className="grid divide-y divide-slate-700 bg-slate-800 rounded-md anim-modal overflow-y-hidden">
                <SearchInput />
                <SearchResult />
            </div>
        </div>
    )
}