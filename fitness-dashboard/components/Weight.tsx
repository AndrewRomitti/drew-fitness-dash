import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input';

const Weight = () => {
    const weightGain = 0;

  return (
    <div className="bg-white w-100 h-90 m-5 p-5 flex items-center justify-center border-2 border-orange-700 rounded-lg drop-shadow-lg hover:drop-shadow-xl">
        <form className="flex flex-col gap-5 text-center">
            <p className="text-xl">⚖️ Log Weight</p>
            <p className="text-sm text-gray-500">1 Week Gain: {weightGain} lbs</p>
            <div className="-auto flex items-center gap-5">
                <div className="w-15 text-gray-500 text-sm text-left">Today's Weight</div>
                <Input type="number" required/>
            </div>
            <Button className="bg-orange-700 w-40 mx-auto hover:bg-orange-600" type="submit">
                Log
            </Button>
        </form>
    </div>
  )
}

export default Weight