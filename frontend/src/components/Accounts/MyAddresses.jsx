import { useState } from "react";
import { BiPlus } from "react-icons/bi";

import AddressForm from "./AddressForm";
import { X } from "lucide-react";
import ListAddresses from "./ListAddresses";
import userService from "../../services/userServices";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const MyAddresses = () => {
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    console.log(address);

    const updatedUserData = await userService.addAddress(address);

    if (updatedUserData) {
      dispatch(login(updatedUserData));
      setOpenForm(false);
    } else {
      setAddress({
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-3/4 border border-neutral-600 rounded-2xl p-5 mx-auto my-10">
      <h1 className="text-xl font-semibold">My addresses</h1>
      <div
        onClick={() => setOpenForm(true)}
        className="flex gap-2 my-3 cursor-pointer hover:text-green-500 text-green-400"
      >
        <BiPlus size={20} />
        <div>Add new address</div>
      </div>

      <ListAddresses />

      {openForm && (
        <div className="absolute backdrop-blur-sm flex justify-center items-center h-screen w-full inset-0">
          <div className="border border-neutral-500 w-3/6 p-10 rounded-3xl">
            <div className="flex justify-between font-semibold">
              <h1 className="text-lg">Enter Complete Address</h1>
              <X onClick={() => setOpenForm(false)} />
            </div>
            <AddressForm
              address={address}
              setAddress={setAddress}
              title=""
              border={false}
            />
            <button
              onClick={handleSubmit}
              className="p-2 mt-4 font-semibold hover:bg-rose-600 bg-rose-500 w-full rounded-md"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddresses;
