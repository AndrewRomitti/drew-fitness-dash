"use client";

import { loginAction, signOutAction } from '@/actions/users';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import toast from 'react-hot-toast';

function SignOutButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClickSignOutButton = () => {
        startTransition(async () => {
            const {errorMessage} = await signOutAction()
            if (!errorMessage) {
                toast.success("Sucessfully signed out");
            } else {
                toast.error(errorMessage)
            }
        })
    }

  return (
    <button className="hover:text-gray-500" onClick={() => handleClickSignOutButton()} disabled={isPending}>{isPending ? "Signing out..." : "Sign Out"}</button>
  )
}

export default SignOutButton