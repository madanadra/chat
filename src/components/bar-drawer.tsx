import { useChat } from "../zustand";
import Bar from "./bar";

export default function BarDrawer() {
  const {overlay} = useChat()

  return (
    <div onClick={(e) => e.stopPropagation()} 
    className={`${overlay === 'bar' ? 'grid' : 'hidden'} grid w-4/5 max-w-80 h-full anim-drawer`}>
      <Bar />
    </div>
  )
}