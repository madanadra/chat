import BottomChat from "./bottom-chat";
import ContentChat from "./content-chat";
import TopChat from "./top-chat";

export default function Chat() {
    return (
        <div className="flex flex-col overflow-y-hidden">
            <TopChat />
            <ContentChat />
            <BottomChat />
        </div>
    )
}