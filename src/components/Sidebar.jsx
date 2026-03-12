import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListTodo, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Sidebar({ user, onLogout }) {

  const [openProfile, setOpenProfile] = useState(false);

  return (
    <aside className="hidden md:flex w-72 min-h-screen flex-col relative bg-white  shadow-sm">

      {/* Logo */}
      <div className="px-6 py-6 text-xl font-bold text-center">
        Task Manager
      </div>

      {/* Menu */}
      <div className="px-3 mt-6 space-y-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200
            ${isActive
              ? "bg-[#1B2DFB] text-white"
              : "text-gray-700 hover:bg-[#3245FF] hover:text-white"}`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium text-sm">Dashboard</span>
        </NavLink>

        <NavLink
  to="/tasks"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200
    ${isActive
      ? "bg-[#1B2DFB] text-white"
      : "text-gray-700 hover:bg-[#3245FF] hover:text-white"}`
  }
>
  <ListTodo className="w-5 h-5" />
  <span className="font-medium text-sm">Tasks</span>
</NavLink>

      </div>

      {/* Profile */}
      <div className="mt-auto p-4 ">

        <div
          onClick={() => setOpenProfile(!openProfile)}
          className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
        >

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-600" />
            </div>

            <p className="text-sm font-semibold text-gray-800">
              {user?.username}
            </p>

          </div>

          <LogOut className="w-5 h-5 text-gray-500" />

        </div>

      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {openProfile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 left-4 w-60 bg-white rounded-lg shadow-lg "
          >

            <button
              onClick={() => {
                setOpenProfile(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="text-red-500 font-medium">Log Out</span>
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </aside>
  );
}