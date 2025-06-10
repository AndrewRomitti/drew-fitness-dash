import { getUser } from '@/lib/auth'
import React from 'react'
import LoginButton from './LoginButton';
import SignOutButton from './SignOutButton';

async function Navbar() {
    const user = await getUser();

  return (
    <div className="w-full bg-white text-black text-center flex gap-20 justify-between p-5">
        <div className="text-xl">FitTrack</div>
        <div className="text-xl">{user ? <SignOutButton /> : <LoginButton />}</div>
    </div>
  )
}

export default Navbar