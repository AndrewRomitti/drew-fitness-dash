"use client";

import { loginAction } from '@/actions/users';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast';

function LoginButton() {
    const router = useRouter();

    const [isReady, setIsReady] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setIsReady(true);
    }, []);

    const handleClickLoginButton = (provider: Provider) => {
        startTransition(async () => {
            const {errorMessage, url} = await loginAction(provider)
            if (!errorMessage && url) {
                router.push(url)
            } else {
                toast.error(errorMessage)
            }
        })
    }

  return (
    <button disabled={!isReady || isPending} className="hover:text-gray-500" onClick={() => handleClickLoginButton("github")}>{isPending ? "Signing in..." : "Sign In"}</button>
  )
}

export default LoginButton