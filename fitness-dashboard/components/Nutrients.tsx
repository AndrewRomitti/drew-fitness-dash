'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

const Nutrients = () => {
    const [protein, setProtein] = useState('');
    const [calories, setCalories] = useState('');

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {
            data: { user },
            error: authError
        } = await supabase.auth.getUser();

        if (!user) {
            toast.error('Must be logged in');
            return;
        }

        const {error} = await supabase
            .from('nutrients')
            .insert({user_id: user.id, protein: protein, calories: calories});

        if (error) {
            console.log(error);
            if (error.message.includes('unique')) {
                toast.error('Already logged nutrients for today')
            } else if (error.message.includes('integer')) {
                toast.error('Protein and Calories must be whole numbers')
            } else {
                toast.error('Failure to log weight')
            }
        } else {
            toast.success('Successfully logged nutrients');
            setProtein('')
            setCalories('')
        }
    }

    const nutrientStreak = 0;

  return (
    <div onSubmit={handleSubmit} className="bg-white w-100 h-90 m-5 p-5 flex items-center justify-center border-2 border-purple-700 rounded-lg drop-shadow-lg hover:drop-shadow-xl">
        <form className="flex flex-col gap-5 text-center">
            <p className="text-xl">🍉 Daily Nutrients</p>
            <p className="text-sm text-gray-500">Nutrient Streak: {nutrientStreak}</p>
            <div className="-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Protein</div>
                <Input name="protein" value={protein} onChange={(e) => setProtein(e.target.value)} className="w-auto" type="number" required/>
            </div>
            <div className="-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Calories</div>
                <Input name="calories" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-auto" type="number" required/>
            </div>
            <Button className="bg-purple-700 w-40 mx-auto hover:bg-purple-600" type="submit">
                Log
            </Button>
        </form>

    </div>
  )
}

export default Nutrients