import { PiChats } from "react-icons/pi";
import { useChat } from "../zustand";
import Login from "./login";
import Signup from "./signup";

export default function Unauth() {
    const {unauth} = useChat()

    return (
        <div className='grid gap-y-10 max-w-sm mx-auto py-12 px-4'>
            <PiChats className="text-emerald-500 text-8xl mx-auto" />
            {unauth === 'login' ? <Login /> : unauth === 'signup' ? <Signup /> : []}
        </div>
    )
}