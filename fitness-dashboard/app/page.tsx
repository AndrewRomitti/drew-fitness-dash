import FindExercise from "@/components/FindExercise";
import LogExercise from "@/components/LogExercise";
import Navbar from "@/components/Navbar";
import Nutrients from "@/components/Nutrients";
import Weight from "@/components/Weight";

export default function Home() {
  return (
    <div className="text-black min-h-screen bg-gray-100">
      <Navbar />
      <div className="mt-10 mb-10 text-3xl text-center">Today is a: REST DAY</div>
      <div className="flex justify-center flex-col">
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-4">
          <Nutrients />
          <Weight />
          <LogExercise />
        </div>
        <div className="flex justify-center">
          <FindExercise />
        </div>
      </div>
    </div>
  );
}
