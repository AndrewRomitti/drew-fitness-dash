import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const FindExercise = () => {
  return (
    <div className="bg-white w-150 h-auto m-5 p-5 flex items-center justify-center border-2 border-green-700 rounded-lg drop-shadow-lg hover:drop-shadow-xl">
        <form className="flex flex-col gap-5 text-center">
            <p className="text-xl">🔎 Find Exercise</p>
            <div className="w-auto h-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Exercise</div>
                <Input className="w-70" type="text" required/>
                <Button className="bg-green-700 w-40 mx-auto hover:bg-green-600" type="submit">
                    Search
                </Button>
            </div>
            <div className="w-15 text-gray-500 text-sm text-left">Trend 📈</div>
            <div className="w-15 text-gray-500 text-sm text-left">Best Set</div>
        </form>
    </div>
  )
}

export default FindExercise