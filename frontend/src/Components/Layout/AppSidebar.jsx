import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Link, useLocation } from "react-router-dom";

import { 
  Home, 
  Inbox, 
  Search, 
  Users, 
  Shield, 
  Settings 
} from "lucide-react";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Search", url: "/search", icon: Search },
  { title: "Vendor Management", url: "/users", icon: Users },
  { title: "Role Management", url: "/roles", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="border-r" collapsible="icon">

      {/* SIDEBAR HEADER */}
      <SidebarHeader>
        <div className="flex items-center justify-between px-3 py-2">

          <SidebarTrigger className="sidebar-expanded:block hidden" />
        </div>
      </SidebarHeader>

      {/* SIDEBAR CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <Icon className="h-5 w-5" />

                      <span className="">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  );
}
