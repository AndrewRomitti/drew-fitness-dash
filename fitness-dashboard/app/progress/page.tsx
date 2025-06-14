'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'

type Nutrients = {
    protein: any,
    calories: any,
    logged_at: any,
}

type Weights = {
    weight: any,
    logged_at: any,
}

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


const page = () => {
    const [nutrients, setNutrients] = useState<Nutrients[]>([]);
    const [weights, setWeights] = useState<Weights[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const supabase = createClient();

    useEffect(() => {
        const fetchNutrients = async () => {
            const {
                data: {user},
                error: authError,
            } = await supabase.auth.getUser();

            if (!user) {
                console.log('Must be logged in to view')
                setNutrients([])
            }

            const { data, error } = await supabase
                .from('nutrients')
                .select('protein, calories, logged_at')
                .eq('user_id', user?.id)
                .order('logged_at', {ascending: false})

            if (error) {
                setNutrients([]);
            } else {
                setNutrients(data ?? []);
            }
        }

        const fetchWeights = async () => {
            const {
                data: {user},
                error: authError,
            } = await supabase.auth.getUser();

            if (!user) {
                console.log('Must be logged in to view')
                setWeights([])
            }

            const { data, error } = await supabase
                .from('weights')
                .select('weight, logged_at')
                .eq('user_id', user?.id)
                .order('logged_at', {ascending: false})

            if (error) {
                setWeights([]);
            } else {
                setWeights(data ?? []);
            }
        }

        const fetchExercises = async () => {
            const {
                data: {user},
                error: authError,
            } = await supabase.auth.getUser();

            if (!user) {
                console.log('Must be logged in to view')
                setExercises([])
            }

            const { data, error } = await supabase
                .from('exercises')
                .select('category, exercise, set1, set2, set3, weight1, weight2, weight3, logged_at')
                .eq('user_id', user?.id)
                .order('logged_at', {ascending: false})

            if (error) {
                setExercises([]);
            } else {
                setExercises(data || []);
            }
        }

        fetchNutrients();
        fetchWeights();
        fetchExercises();
    }, [])

  return (
    <div className="text-black min-h-screen mt-5 mb-5">
        <p className="text-3xl text-center">Progress</p>

        <div className="flex flex-col gap-10 items-center justify-center mt-5 rounded-lg">
            <div className="bg-white rounded w-150 h-fit flex justify-center items-center flex-col gap-5">
                <p className="text-xl">Nutrients</p>
                <div className="flex flex-col w-100 gap-5">
                    {nutrients.length === 0 ? (
                        <p>No data to show</p>
                    ) : (
                        nutrients.map((item, i) => (
                        <div className="flex flex-col w-full h-fit border-solid border-gray-200 border-2 rounded-lg">
                            <div key={i} className="mb-2 flex gap-5 justify-center">
                                <p>Calories: {item.calories}</p>
                                <p>Protein: {item.protein}</p>
                                <p>Date: {item.logged_at}</p>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>
            <div className="bg-white w-150 h-fit flex justify-center items-center flex-col gap-5 rounded-lg">
                <p className="text-xl">Weight Data</p>
                <div className="flex flex-col w-100 gap-5">
                    {weights.length === 0 ? (
                        <p>No data to show</p>
                    ) : (
                        weights.map((item, i) => (
                            <div className="flex flex-col w-full h-fit border-solid border-gray-200 border-2 rounded-lg items-center">
                                <div key={i} className="mb-2 flex gap-5">
                                    <p>Weight: {item.weight}</p>
                                    <p>Date: {item.logged_at}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="bg-white w-150 h-fit flex justify-center items-center flex-col gap-5 rounded-lg">
                <p className="text-xl">Exercise Data</p>
                <div className="flex flex-col w-100">
                    {exercises.length === 0 ? (
                        <p>No data to show</p>
                    ) : (
                        
                        exercises.map((item, i) => (
                        <div key={i} className="mb-2 flex gap-5">
                            <div className="flex flex-col items-center w-full h-fit border-solid border-gray-200 border-2 rounded-lg">
                                <p>Exercise: {item.exercise}</p>
                                <div className="flex gap-5">
                                    <p>Set 1: {item.set1}</p>
                                    <p>Set 2: {item.set2}</p>
                                    <p>Set 3: {item.set3}</p>
                                </div>
                                <div className="flex gap-5">
                                    <p>Weight 1: {item.weight1}</p>
                                    <p>Weight 2: {item.weight2}</p>
                                    <p>Weight 3: {item.weight3}</p>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default page