import Navbar from '../components/Navbar'
import { MessageSquare, Plus } from "lucide-react";

const Feedback = () => {
  return (
    <div className='bg-black text-white min-h-screen p-6 pt-20'>
        <Navbar />
        {/* HEADER */}
      <div className="flex justify-around items-center mb-10 ">
        <h1 className="text-2xl font-semibold">Feedback</h1>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          <Plus size={16} />
          Create Feedback
        </button>
      </div>

      {/* EMPTY STATE */}
      <div className="flex flex-col items-center justify-center text-center mt-20">
        
        {/* ICON */}
        <div className="w-16 h-16 flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 mb-4">
          <MessageSquare className="text-neutral-400" size={28} />
        </div>

        {/* TEXT */}
        <h2 className="text-lg font-medium text-neutral-300">
          No feedback yet
        </h2>

        <p className="text-sm text-neutral-500 mt-1">
          Share your thoughts and help us improve!
        </p>

        {/* BUTTON */}
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium">
          Submit Your First Feedback
        </button>
      </div>
            
        </div>
  )
}

export default Feedback
