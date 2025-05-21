import { BiSolidHome } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const ListAddresses = () => {
  const userdata = useSelector((state) => state.auth?.userData);
  const addresses = userdata?.addresses || [];

  return (
    <div className="flex flex-col gap-4 mt-7">
      {addresses.map((addr, i) => {
        const fullAddress = Object.values(addr).filter(Boolean).join(", ");
        return (
          <div
            key={i}
            className="flex items-center rounded-xl gap-3 p-5 border border-neutral-600"
          >
            <div className="bg-gray-100 rounded-lg p-1 text-black">
              <BiSolidHome size={30} />
            </div>
            <div className="w-full">
              <h1 className="font-semibold">Address {i + 1}</h1>
              <div className="text-sm text-neutral-300">{fullAddress}</div>
            </div>
            <div>
              <BsThreeDotsVertical />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListAddresses;
