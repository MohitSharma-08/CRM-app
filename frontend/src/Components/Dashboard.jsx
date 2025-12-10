import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Layout/AppSidebar";
import Navbar from "./Layout/Layout";
import UserDetailsModal from "./Modal/UserDetailsModal";
import CreateVendorModal from "./Modal/CreateVendorModal";
import { User as UserIcon, Menu, PlusIcon } from "lucide-react";

export default function Layout({ loggedInUser, setLoggedInUser }) {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => console.log("No API connected"));
  }, []);

  const toggleUserModal = () => setShowCreateModal((prev) => !prev);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* SHADCN SIDEBAR */}
        <AppSidebar />

        {/* RIGHT SIDE AREA */}
        <div className="flex-1 flex flex-col">
          {/* TOP NAVBAR */}
          {/* <Navbar /> */}

          {/* PAGE CONTENT */}
          <main className="w-full flex flex-col h-screen bg-slate-50">
            {/* NAVBAR */}
            {!showCreateModal && (
              <div className="flex items-center h-14 bg-white border-b shadow-sm px-4 relative">
                {/* Sidebar Trigger */}
                <button onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-6 w-6" />
                </button>

                <p className="ml-4 font-semibold">
                  Transport Management System from
                </p>

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
              </div>
            )}

            {/* PAGE CONTENT + ROUTES */}
            <div className="flex-1 overflow-auto p-4">
              <AppRoutes />
            </div>

            {/* PROFILE MODAL */}
            {showUserDetails && (
              <UserDetailsModal
                loggedInUser={loggedInUser}
                setShowUserDetails={setShowUserDetails}
                setLoggedInUser={setLoggedInUser}
              />
            )}

            {/* ADD USER MODAL */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
                <CreateVendorModal handleModal={toggleUserModal} />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
