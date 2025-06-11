'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import { getSupabaseAuth, getUser } from '@/lib/auth';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

const Weight = () => {
    const [weight, setWeight] = useState('')
    const supabase = createClient();


    const weightGain = 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {
            data: { user },
            error: authError
            } = await supabase.auth.getUser();


        if (!user) {
            toast.error('Must be logged in')
            return
        }

        const { error } = await supabase
            .from('weights')
            .insert([{weight: parseFloat(weight), user_id:user.id}])

        if (error) {
            if (error.message.includes('unique')) {
                toast.error('Already logged weight today');
            } else {
                console.log(error.message);
                toast.error('Failed to log weight');
            }
        } else {
            toast.success('Logged weight Successfully');
            setWeight('')
        }
    }

  return (
    <div className="bg-white w-100 h-90 m-5 p-5 flex items-center justify-center border-2 border-orange-700 rounded-lg drop-shadow-lg hover:drop-shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center">
            <p className="text-xl">⚖️ Log Weight</p>
            <p className="text-sm text-gray-500">1 Week Gain: {weightGain} lbs</p>
            <div className="-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Today's Weight</div>
                <Input name="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
            </div>
            <Button className="bg-orange-700 w-40 mx-auto hover:bg-orange-600" type="submit">
                Log
            </Button>
        </form>
    </div>
  )
}

export default Weight