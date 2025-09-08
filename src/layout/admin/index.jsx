import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/custom/admin/topNavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />
        <div className="flex flex-1 flex-col gap-4 p-2 bg-gray-50 ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
