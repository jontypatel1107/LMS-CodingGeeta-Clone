import Navbar from '../components/Navbar'

function Attendance() {
  const data = localStorage.getItem("user")
  const user = data ? JSON.parse(data) : null

  
  const mentors = user?.mentors || []
  const recentClasses = user?.subjects?.slice(7, 10) || []

  const recentAttendance = recentClasses.map((subject) => ({
    subject,
    markedBy: mentors[0]?.name || "Instructor",
    status: "present",
  }))

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white">
      <Navbar />
      <main className="pt-24 pb-10 px-4 md:px-8 max-w-6xl mx-auto">
        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-800 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h2 className="text-2xl font-bold">Today's Attendance</h2>
           
            </div>
            
          </div>

          <div className="mt-5 space-y-3">
            {recentAttendance.length === 0 ? (
              <p className="text-gray-400">No classes found for today.</p>
            ) : (
              recentAttendance.map((item, index) => (
                <div
                  key={`${item.subject}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900 p-4"
                >
                  <div>
                    <p className="font-semibold">{item.subject}</p>
                    <p className="text-sm text-gray-400">Marked by: {item.markedBy}</p>
                  </div>

                  <span className="rounded-full bg-emerald-500/20 px-4 py-1 text-emerald-300 text-sm font-semibold uppercase tracking-wide">
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

       
      </main>
    </div>
  )
}

export default Attendance