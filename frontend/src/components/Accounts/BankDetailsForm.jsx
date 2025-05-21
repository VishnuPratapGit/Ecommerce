import Input from "../Input";
import { Banknote, User } from "lucide-react";

export default function BankDetailsForm({ bankDetails, setBankDetails }) {
  const handleChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="border rounded-xl border-neutral-300 p-4 w-full mt-6 sm:mt-0">
      <h2 className="font-semibold text-lg mb-3">Bank Details</h2>

      <Input
        name="accountHolderName"
        placeholder="Account Holder Name"
        value={bankDetails.accountHolderName}
        onChange={handleChange}
        icon={User}
        required
      />

      <Input
        type="number"
        name="accountNumber"
        placeholder="Account Number"
        value={bankDetails.accountNumber}
        onChange={handleChange}
        icon={Banknote}
        required
        className="mt-2"
      />

      <Input
        name="ifscCode"
        placeholder="IFSC Code"
        value={bankDetails.ifscCode}
        onChange={handleChange}
        className="mt-2"
      />

      <Input
        name="bankName"
        placeholder="Bank Name"
        value={bankDetails.bankName}
        onChange={handleChange}
        className="mt-2"
      />

      <Input
        name="branchName"
        placeholder="Branch Name"
        value={bankDetails.branchName}
        onChange={handleChange}
        className="mt-2"
      />

      <Input
        name="upiId"
        placeholder="UPI ID (Optional)"
        value={bankDetails.upiId}
        onChange={handleChange}
        className="mt-2"
      />
    </div>
  );
}
