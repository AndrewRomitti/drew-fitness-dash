import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const LogExercise = () => {
  return (
    <div className="bg-white w-100 h-auto m-5 p-5 flex items-center justify-center border-2 border-blue-700 rounded-lg drop-shadow-lg hover:drop-shadow-xl">
        <form className="flex flex-col gap-5 text-center">
            <p className="text-xl">🏋️‍♂️ Log Exercise</p>
            <div className="w-auto h-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Category</div>
                <Input className="w-70" type="text" required/>
            </div>
            <div className="w-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Exercise</div>
                <Input className="w-70" type="text" required/>
            </div>
            <div className="w-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Sets</div>
                <Input className="w-20" type="number" required/>
                <Input className="w-20" type="number" required/>
                <Input className="w-20" type="number" required/>
            </div>
            <div className="w-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Weight</div>
                <Input className="w-20" type="number" required/>
                <Input className="w-20" type="number" required/>
                <Input className="w-20" type="number" required/>
            </div>
            <Button className="bg-blue-700 w-40 mx-auto hover:bg-blue-600" type="submit">
                Submit
            </Button>
        </form>
    </div>
  )
}

export default LogExercise