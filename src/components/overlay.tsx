import { useChat } from "../zustand"
import BarDrawer from "./bar-drawer"
import LogoutModal from "./logout-modal"
import SearchModal from "./search-modal"

export default function Overlay() {
    const {overlay, setOverlay} = useChat()

    return (
        <div onClick={() => setOverlay(null)} className={`${!overlay ? 'hidden' : ''} fixed inset-0 backdrop-blur-sm backdrop-brightness-50 z-50`}>
            <BarDrawer /> 
            <SearchModal /> 
            <LogoutModal />
        </div>
    )
}