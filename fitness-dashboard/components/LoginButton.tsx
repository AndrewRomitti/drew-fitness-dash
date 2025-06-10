"use client";

import { loginAction } from '@/actions/users';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import toast from 'react-hot-toast';

function LoginButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

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
    <button className="hover:text-gray-500" onClick={() => handleClickLoginButton("github")} disabled={isPending}>{isPending ? "Signing in..." : "Sign In"}</button>
  )
}

export default LoginButton