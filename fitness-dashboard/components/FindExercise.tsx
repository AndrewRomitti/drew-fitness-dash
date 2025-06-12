'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

type Exercise = {
  category: any,
  exercise: any,
  set1: any,
  set2: any,
  set3: any,
  weight1: any,
  weight2: any,
  weight3: any,
  logged_at: any,
}


const FindExercise = () => {
  const suapbase = createClient();
  const [data, setData] = useState<Exercise[]>([]);
  const [exercise, setExercise] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: {user},
      error: authError,
    } = await suapbase.auth.getUser();

    if (!user) {
      toast.error('Must be logged in');
      setData([]);
      return;
    }

    const {data, error} = await suapbase
      .from('exercises')
      .select('category, exercise, set1, set2, set3, weight1, weight2, weight3, logged_at')
      .eq('exercise', exercise)
      .eq('user_id', user?.id)
      .order('logged_at', {ascending: false})
      .single()

    if (error) {
      toast.error('Error fetching data');
      setData([])
    } else {
      toast.success('Fetched data');
      setData([data]);
    }
  }



  return (
    <div className="bg-white w-150 h-auto m-5 p-5 flex items-center justify-center border-2 border-green-700 rounded-lg drop-shadow-lg hover:drop-shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-center">
            <p className="text-xl">🔎 Find Last Set</p>
            <div className="w-auto h-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Exercise</div>
                <Input name="exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} className="w-70" type="text" required/>
                <Button className="bg-green-700 w-40 mx-auto hover:bg-green-600" type="submit">
                    Search
                </Button>
            </div>
            <div className="mt-4 space-y-2">
              {data.length === 0 ? (
                <p>No data to show</p>
              ) : (
                data.map((item, i) => (
                  <div key={i}>
                      <p>Last Logged: {item.logged_at}</p>
                      <div className="flex gap-5 justify-center">
                        <p>Set 1: {item.set1} ({item.weight1})</p>
                        <p>Set 2: {item.set2} ({item.weight2})</p>
                        <p>Set 3: {item.set3} ({item.weight3})</p>
                      </div>
                  </div>
                ))
              )}

            </div>
        </form>
    </div>
  )
}

export default FindExercise