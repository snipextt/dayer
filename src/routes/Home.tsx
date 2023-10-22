// import { useServices } from "@/providers/ServiceProvider";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/Layout/Sidebar";
import { Navbar } from "@/components/Layout/Navbar";
import { Divider } from "@nextui-org/react";

const Home = () => {
  return (
    <div className="h-full flex">
      <Sidebar />
      <Divider orientation="vertical" />
      <div className="container p-0">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
