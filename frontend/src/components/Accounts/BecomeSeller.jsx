import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import BankDetailsForm from "./BankDetailsForm";
import AddressForm from "./AddressForm";
import { IdCard } from "lucide-react";
import userService from "../../services/userServices";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    upiId: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(address.pincode) || address.pincode <= 0) {
      alert("Pincode must be a valid positive number.");
      return;
    }
    if (
      isNaN(bankDetails.accountNumber) ||
      bankDetails.accountNumber.length <= 8
    ) {
      alert("Account must be a valid 8-12 digit positive number.");
      return;
    }

    setIsSubmitting(true);

    const sellerDetails = {
      isSeller: true,
      sellerProfile: {
        storeName: storeName,
        businessAddress: address,
        bankDetails: bankDetails,
      },
    };

    const userData = await userService.sellerRegistration(sellerDetails);

    if (userData) {
      console.log(userData);
      navigate("/sell-products");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-svh flex items-center justify-center w-full my-5 sm:my-0">
      <div className="w-3/4 bg-white text-black rounded-2xl shadow-xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-500 mt-2">Create Your Seller Profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="Store Name"
            icon={IdCard}
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />

          <div className="sm:flex gap-6">
            <AddressForm address={address} setAddress={setAddress} />
            <BankDetailsForm
              bankDetails={bankDetails}
              setBankDetails={setBankDetails}
            />
          </div>

          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller;
