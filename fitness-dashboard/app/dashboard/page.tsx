import FindExercise from "@/components/FindExercise";
import LogExercise from "@/components/LogExercise";
import Navbar from "@/components/Navbar";
import Nutrients from "@/components/Nutrients";
import Weight from "@/components/Weight";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="text-black min-h-screen">
      <div className="mt-10 mb-10 text-3xl text-center">Hello, {user?.email || 'please sign in to continue'} </div>
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