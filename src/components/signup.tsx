import { PiChats } from "react-icons/pi";
import { useChat } from "../zustand";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios, { AxiosError } from "axios";

export default function Signup() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const {setError, setUnauth} = useChat()
    const [, setCookie] = useCookies(['chat-auth-token'], {
        doNotParse: true,
        doNotUpdate: true
    })

    const signup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const {data} = await axios.post(import.meta.env.VITE_AUTH_TOKEN+'/signup', {
                username: username, password: password, password_confirmation: passwordConfirmation
            })
    
            if (data.error) {
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')
                setError(data.error)
            }

            if (data.data) {
                setCookie('chat-auth-token', data.data, {secure: true, sameSite: 'lax', maxAge: 3600*24*7})
            }
        } catch(err) {
            const error = err as AxiosError
    
            setError(error.message)
        } finally {
          setLoading(false)
        }
    }

    return (<>
        <h1 className='text-2xl text-center font-bold'>Create Your Chat Account</h1>
        <form onSubmit={signup} className='grid gap-y-4 text-sm'>
            <div className='grid gap-y-2'>
                <h1 className='font-medium'>Username</h1>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required
                className='w-full bg-slate-700 rounded-md py-2 px-3 ring-inset focus:ring-2 focus:ring-emerald-500 outline-none border-t border-slate-600' />
            </div>
            <div className='grid gap-y-2'>
                <h1 className='font-medium'>Password</h1>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required
                className='w-full bg-slate-700 rounded-md py-2 px-3 ring-inset focus:ring-2 focus:ring-emerald-500 outline-none border-t border-slate-600' />
            </div>
            <div className='grid gap-y-2'>
                <h1 className='font-medium'>Password confirmation</h1>
                <input type='password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required
                className='w-full bg-slate-700 rounded-md py-2 px-3 ring-inset focus:ring-2 focus:ring-emerald-500 outline-none border-t border-slate-600' />
            </div>
            <button type="submit" disabled={loading}
            className='flex justify-center items-center gap-x-2.5 py-2 px-3 font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-400 mt-2'>
                <div className={`${loading ? '' : 'hidden'} w-5 aspect-square rounded-full border-2 border-slate-50 border-r-transparent animate-spin`} /> 
                Sign up
            </button>
        </form>
        <h1 className="text-sm text-center">
            Have an account? <span onClick={() => setUnauth('login')} className="font-medium text-emerald-500 cursor-pointer">Log in</span>
        </h1>
    </>)
}