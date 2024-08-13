import BottomBar from "./bottom-bar";
import ContentBar from "./content-bar";
import TopBar from "./top-bar";

export default function Bar() {
    return (
        <div className="bg-slate-800 flex flex-col divide-y divide-slate-700 overflow-y-hidden">
            <TopBar />
            <ContentBar />
            <BottomBar />
        </div>
    )
}