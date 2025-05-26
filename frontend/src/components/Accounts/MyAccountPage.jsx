import { User } from "lucide-react";
import { useSelector } from "react-redux";
import AccoutDetails from "./AccountDetails";
import MyAccountMenu from "./MyAccountMenu";
import { Outlet } from "react-router-dom";

const MyAccountPage = () => {
  const user = useSelector((state) => state.auth?.userData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      {/* Left Sidebar */}
      <div className="md:col-span-1 space-y-6">
        <div className="flex items-center gap-4 p-4 border border-neutral-600 rounded-lg">
          <div className="border rounded-full p-3">
            <User size={24} />
          </div>
          <div>
            <p className="text-gray-600">Hello,</p>
            <h2 className="font-semibold text-lg">{user?.name}</h2>
          </div>
        </div>

        {/* Menu Section */}
        <div className="space-y-2 border rounded-lg border-neutral-600">
          <MyAccountMenu />
        </div>
      </div>

      {/* Right Content */}
      <div className="md:col-span-3 border border-neutral-600 rounded-lg p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccountPage;
