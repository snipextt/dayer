import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/Layout/Sidebar";
import { Navbar } from "@/components/Layout/Navbar";
import { Divider } from "@nextui-org/react";

const AppRoot = () => {
  return (
    <div className="h-full flex">
      <Sidebar />
      <Divider orientation="vertical" />
      <div className="container p-0">
        <Navbar />
        <div className="h-[calc(100vh-77px)] p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppRoot;
