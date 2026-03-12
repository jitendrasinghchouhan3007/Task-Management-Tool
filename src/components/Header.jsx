import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {

  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/projects": "Projects"
  };

  const getPageTitle = () => {

    if (titles[location.pathname]) {
      return titles[location.pathname];
    }

    if (location.pathname.startsWith("/projects/")) {
      return "Project Details";
    }

    if (location.pathname.includes("/whiteboards")) {
      return "Whiteboard Editor";
    }

    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white  flex items-center justify-between px-6 shadow-sm">

      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800">
        {getPageTitle()}
      </h2>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition">

          <Bell className="w-5 h-5 text-gray-600" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

      </div>

    </header>
  );
}