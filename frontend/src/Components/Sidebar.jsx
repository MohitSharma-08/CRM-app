import { Link } from "react-router-dom";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { Home, Inbox, Search, Settings, Users, Shield } from "lucide-react";

const navItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Inbox", icon: Inbox, href: "/inbox" },
  { title: "Search", icon: Search, href: "/search" },
  { title: "User Management", icon: Users, href: "/users" },
  { title: "Role Management", icon: Shield, href: "/roles" },
  { title: "Settings", icon: Settings, href: "/settings" },
];


export default function Sidebar({ open, setOpen }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Dashboard</SheetTitle>
        </SheetHeader>

        <div className="p-2">
          {navItems.map((item) => (
            <Link  
              key={item.title}
              to={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-slate-100 transition"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
