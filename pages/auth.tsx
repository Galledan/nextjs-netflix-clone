import Input from '@/components/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import React, { useCallback, useState } from 'react'


const Auth = () => {

    const router = useRouter()

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    
    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email, password, redirect: false, callbackUrl: '/'
            })

            router.push('/');
        } catch (error) {
            console.log(error);
            
        }
    },[email, password,router])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email, name, password
            })
        } catch (error) {
            console.log(error);

        }
    }, [email,name,password])



    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover ">
            <div className='bg-black w-full h-full lg:bg-opacity-50'>
                <nav className='px-12 py-5'>
                    <Image src="/images/logo.png" alt="logo" height={48} width={180} />
                </nav>
                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-65 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md'>
                        <h2 className='text-white text-4xl mb-8 font-bold'>{variant === 'login' ? 'Sign In' : 'Register'}</h2>
                        <div className='flex flex-col gap-4'>
                            {variant === 'register' && (
                                <Input label='Username' onChange={(e: any) => setName(e.target.value)} id="name" value={name} />
                            )}

                            <Input label='Email' onChange={(e: any) => setEmail(e.target.value)} id="email" type='email' value={email} />
                            <Input label='Password' onChange={(e: any) => setPassword(e.target.value)} id="email" type='password' value={password} />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className='bg-red-600 py-3 text-white rounded-md font-semibold w-full mt-10 hover:bg-red-700 transition'>
                            {variant === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <p className='text-neutral-500 mt-12'>{variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>{variant === 'login' ? 'Create an account' : 'Login'}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth