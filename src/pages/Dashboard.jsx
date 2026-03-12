import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard({ user }) {

  const [taskCount, setTaskCount] = useState(0);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {

    const updateTaskCount = () => {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTaskCount(savedTasks.length);
    };

    // run when dashboard loads
    updateTaskCount();

    // listen when tasks change
    window.addEventListener("tasksUpdated", updateTaskCount);

    return () => {
      window.removeEventListener("tasksUpdated", updateTaskCount);
    };

  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      <div className="flex items-start gap-6">

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
          <Sun className="text-blue-500" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {user?.username} !
          </h1>

          <p className="text-gray-500 mt-2">{today}</p>

          <p className="text-gray-500 mt-4">
            Here's what's happening today. You have
            <span className="font-semibold text-gray-900">
              {" "} {taskCount} tasks{" "}
            </span>
            in your workspace.
          </p>

        </div>

      </div>

    </div>
  );
}