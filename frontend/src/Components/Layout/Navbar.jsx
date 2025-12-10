import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, User as UserIcon } from "lucide-react";

export default function Navbar({ loggedInUser, setShowUserDetails }) {
  return (
    <header className="h-14 bg-slate-50 border-b shadow-sm flex items-center px-4">

      {/* SIDEBAR COLLAPSE/OPEN BUTTON */}
      <SidebarTrigger>
        <Menu className="h-5 w-5" />
      </SidebarTrigger>

      <h1 className="ml-4 font-semibold">Transport Management System </h1>

      {/* USER AVATAR BUTTON */}
      <div
        className="ml-auto flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-slate-100 transition-all"
        onClick={() => setShowUserDetails(true)}
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium leading-none">
            {loggedInUser?.name || "Admin"}
          </p>
          <p className="text-xs text-slate-500">View Profile</p>
        </div>

        <div className="h-9 w-9 bg-slate-900 text-white rounded-full flex items-center justify-center">
          <UserIcon className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
