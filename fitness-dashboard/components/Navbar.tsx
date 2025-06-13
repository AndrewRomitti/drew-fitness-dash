import { getUser } from '@/lib/auth'
import React from 'react'
import LoginButton from './LoginButton';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import Link from 'next/link';

async function Navbar() {
    const user = await getUser();

  return (
    <div className="w-full bg-white text-black text-center flex gap-20 justify-between p-5">
        <div className="w-fit h-full flex gap-3 items-center text-xl"><Image src="/favicon.png" width="40" height="20" alt="logo"/> <Link href="/" className="text-black hover:text-gray-500">FitTrack</Link></div>
        <div className="w-fit h-full flex items-center text-xl"> {!user ? <LoginButton /> : <div className="flex gap-10 items-center"><Link href="/dashboard" className="text-black hover:text-gray-500">Dashboard</Link> <Link href="/progress" className="text-black hover:text-gray-500">Progress</Link> <SignOutButton /></div>}</div>
    </div>
  )
}

export default Navbar