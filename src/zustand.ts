import { create } from "zustand";

export type State = {
  user: {
    id: number
    image: string
    username: string
    created_at: string | null
  } | null
  overlay: 'bar' | 'search' | 'logout' | null
  error: string
  recipient: {
    id: number
    image: string
    username: string
  } | null
  unauth: 'login' | 'signup'
  search: string
  chat: {
    user: {
      id: number
      image: string
      username: string
      created_at: string | null
    }
    message: {
      text: string,
      created_at: string | null
    }
  }[]
  message: {
    [key: string] : {
      id: number
      text: string
      user_id: number
      created_at: string | null
    }[]
  }
}
  
type Action = {
    setUser: (value: State['user']) => void
    setOverlay: (value: 'bar' | 'search' | 'logout' | null) => void
    setError: (value: string) => void
    setRecipient: (value: State['recipient']) => void
    setUnauth: (value: 'login' | 'signup') => void
    setSearch: (value: string) => void
    setChat: (value: State['chat']) => void
    setMessage: (value: State['message']) => void
    reset: () => void
}

const initial: State = {
  user: null,
  overlay: null,
  error: '',
  recipient: null,
  unauth: 'login', 
  search: '',
  chat: [],
  message: {}
}

export const useChat = create<State & Action>((set) => ({
  ...initial,
  setUser: (value) => set({user: value}),
  setOverlay: (value) => set({overlay: value}),
  setError: (value) => set({error: value}),
  setRecipient: (value) => set({recipient: value}),
  setUnauth: (value) => set({unauth: value}),
  setSearch: (value) => set({search: value}),
  setChat: (value) => set({chat: value}),
  setMessage: (value) => set({message: value}),
  reset: () => {set(initial)}
}))
