import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

import UserDetailsModal from "../Modal/UserDetailsModal";
import CreateVendorModal from "../Modal/CreateVendorModal";

export default function Layout({ loggedInUser, setLoggedInUser }) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* SIDEBAR */}
        <AppSidebar />

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col">
          {/* NAVBAR */}
          <Navbar
            loggedInUser={loggedInUser}
            setShowUserDetails={setShowUserDetails}
          />

          {/* PAGE AREA */}
          <main className="flex-1 overflow-auto p-4 bg-white">
            <Outlet />
          </main>
        </div>

        {/* USER PROFILE MODAL */}
        {showUserDetails && (
          <UserDetailsModal
            loggedInUser={loggedInUser}
            setShowUserDetails={setShowUserDetails}
            setLoggedInUser={setLoggedInUser}
          />
        )}

        {/* ADD USER MODAL (OPTIONAL) */}
        {showCreateModal && (
          <CreateVendorModal handleModal={() => setShowCreateModal(false)} />
        )}
      </div>
    </SidebarProvider>
  );
}
