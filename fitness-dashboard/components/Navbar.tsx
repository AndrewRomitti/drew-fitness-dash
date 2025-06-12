import { getUser } from '@/lib/auth'
import React from 'react'
import LoginButton from './LoginButton';
import SignOutButton from './SignOutButton';
import Image from 'next/image';

async function Navbar() {
    const user = await getUser();

  return (
    <div className="w-full bg-white text-black text-center flex gap-20 justify-between p-5">
        <div className="flex gap-3 items-center text-xl"><Image src="/favicon.png" width="40" height="20" alt="logo"/> FitTrack</div>
        <div className="text-xl"> {!user ? <LoginButton /> : <div className="flex gap-10"><p>Dashboard</p> <p>Progress</p> <SignOutButton /></div>}</div>
    </div>
  )
}

export default Navbar