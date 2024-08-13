import { useChat } from "../zustand";
import Bar from "./bar";
import Chat from "./chat";
import Overlay from "./overlay";
import Welcome from "./welcome";

export default function Auth() {
    const {recipient} = useChat()

    return (
        <div className="flex divide-x divide-slate-700 h-dvh">
            <div className="hidden md:block">
                <div className="grid w-80 h-full">
                    <Bar />
                </div>
            </div>
            <div className="grid grow">
                {recipient ? <Chat /> : <Welcome />}
            </div>
            <Overlay />
        </div>
    )
}