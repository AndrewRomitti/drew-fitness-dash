'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

const LogExercise = () => {
    const [category, setCategory] = useState('');
    const [exercise, setExercise] = useState('');
    const [set1, setSet1] = useState('');
    const [set2, setSet2] = useState('');
    const [set3, setSet3] = useState('');
    const [weight1, setWeight1] = useState('');
    const [weight2, setWeight2] = useState('');
    const [weight3, setWeight3] = useState('');

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
            .from('exercises')
            .insert([{user_id: user.id, category: category, exercise: exercise, set1: set1, set2: set2, set3: set3, weight1: weight1, weight2: weight2, weight3: weight3}]);

        if (error) {
            if (error.message.includes('unique')) {
                toast.error('Already logged exercise for today');
            } else {
                console.error(error)
                toast.error('Failed to log weight');
            }
        } else {
            toast.success('Logged weight Successfully');
            setCategory('')
            setExercise('')
            setSet1('')
            setSet2('')
            setSet3('')
            setWeight1('')
            setWeight2('')
            setWeight3('')
        }
    }

  return (
    <div className="bg-white w-100 h-auto m-5 p-5 flex items-center justify-center border-2 border-blue-700 rounded-lg drop-shadow-lg hover:drop-shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center">
            <p className="text-xl">🏋️‍♂️ Log Exercise</p>
            <div className="w-auto h-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Category</div>
                <Input name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-70" type="text" required/>
            </div>
            <div className="w-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Exercise</div>
                <Input name="exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} className="w-70" type="text" required/>
            </div>
            <div className="w-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Sets</div>
                <Input name="set1" value={set1} onChange={(e) => setSet1(e.target.value)} className="w-20" type="number" required/>
                <Input name="set2" value={set2} onChange={(e) => setSet2(e.target.value)} className="w-20" type="number" required/>
                <Input name="set3" value={set3} onChange={(e) => setSet3(e.target.value)} className="w-20" type="number" required/>
            </div>
            <div className="w-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Weight</div>
                <Input name="weight1" value={weight1} onChange={(e) => setWeight1(e.target.value)} className="w-20" type="number" required/>
                <Input name="weight2" value={weight2} onChange={(e) => setWeight2(e.target.value)} className="w-20" type="number" required/>
                <Input name="weight3" value={weight3} onChange={(e) => setWeight3(e.target.value)} className="w-20" type="number" required/>
            </div>
            <Button className="bg-blue-700 w-40 mx-auto hover:bg-blue-600" type="submit">
                Submit
            </Button>
        </form>
    </div>
  )
}

export default LogExercise