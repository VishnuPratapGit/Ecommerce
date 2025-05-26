import { useSelector } from "react-redux";

const AccoutDetails = () => {
  const user = useSelector((state) => state.auth?.userData);
  const storeName = user?.sellerProfile?.storeName;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>

      <div className="space-y-3">
        <div className="flex gap-4">
          <p className="text-gray-300">Name:</p>
          <p className="font-medium">{user?.name}</p>
        </div>

        <div className="flex gap-4">
          <p className="text-gray-300">Email Address:</p>
          <p className="font-medium">{user?.email}</p>
        </div>

        {storeName && (
          <div className="flex gap-4">
            <p className="text-gray-300">Store Name:</p>
            <p className="font-medium">{storeName}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AccoutDetails;
